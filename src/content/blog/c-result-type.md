---
title: 'c result type'
description: 'a fun little pre processor macro for adding rust type errors in to c'
pubDate: 'Feb 29 2024'
heroImage: '../../assets/article_hero_images/c_result_type.png'
---

the c result type was made as i wanted better error handling in c than always having to write:
```c
if (func_that_could_error(__VA_ARGS) == -1){
		perror(ERROR_MESSAGE);
		exit(ERROR_CODE); 	
}
```
This type of error handling does definitely work, and i can see why it was implemented this way. although this type of error handling tends to lead to just stopping the program, or even worst not handling the error when it appears causing something to break later on. But we have had years to refine error handling and something more like rusts version of error handle just feels better for a modern time forcing the user to deal with error as they appear (yes i know you can just .unwrap and not give a shit but lets assume you have to deal with the error). But i will admit the initial learning curve of rusts robust error handle system is at times annoying. although i believe it to be one of the better implementations of it.

however this error handling system needs the use of generic typing since you dont know what OK type the error has. this would be an easy fix in the vast majority of languages just throw in you generic type syntax or dont even worry about it in dynamic languages. but c does not a syntax for creating generic type, so we must create our own using both the best and worst thing in the world the c pre processor. for its time c pre processor was an amazing way for implementing meta programming, however it has become a convoluted mess of string manipulation and type unsafety. some of this problems have been addressed over the years such as type unsafety by implementing the __auto_type operator for creating macros. however its still a dangerous beast that can fuck up your entire code with one little mistake that can take hours to fix.
Although all of this are in contrast to the power the pre processor has and with this power comes little responsibility.

# implementation
## defining the syntax
so finally starting with how i implemented with result type as a pre processor macro. firstly the best thing to do is determent how you think the macro should be used, like you might make a really cool macro but people will be discouraged to use it if it makes no sense. however in every macro there will be some fuckary that needs to be done in order to make it work. so this is the kinda of syntax i wanted for the macro.
```c

typedef enum numberAddingErrors_s{
    NUMBERS_NOT_EVEN,
}numberAddingErrors_t;

typedef Result_t(int, numberAddingErrors_t, Result_type_t);

Result_type_t add_even_nums(int num1, int num2){
    if (num1%2 == 0 && num2%2 == 0){
        int num3 = num1+num2;
        Result_type_t_Ok(num3);
    } 
    else {
        Result_type_t_error(NUMBERS_NOT_EVEN);
    }
}

int main(int argc, char const *argv[])
{
    int n1 = 4;
    int n2 = 5;
    Result_type_t answer = add_even_nums(n1, n2);
    int a = Result_type_t_unwrap(answer);
    printf("%d\n", a);
    return 0;
}
```
so you first must define a error type here defined as `numberAddingErrors_t` as an enum. This is so i can have a ton of errors for each type but also doesnt need to be an enum it could be something like another struct so if something errors you know there is an error but it gives you the error struct just incase you can recover from this state.

the `typedef` defines what the error type is, the first argument of `Result_t` is the ok type, the next is the error type and finally is what the Result type should be called, since you will want more then one error type.

within the function that can error here `add_even_nums` that will error when both numbers arnt even. you can see a kind of more literal from of [hungarian notation](https://en.wikipedia.org/wiki/Hungarian_notation) where the type of the function prefixes the name of the function. this was done again to differentiate between each error type

## implementing the syntax
finally the actually implementation of the macros the implement this
```c
#define Result_t_type(ok_type, error_type, type)          \
    struct Result_t {                                      \
        union Data_U{ok_type ok; error_type error;} data;   \
        _Bool has_errored;                                   \
    } type;                                                   \

#define Result_t_funcs(ok_type, error_type, type)                                                            \
    type type##_Ok(ok_type ok){return (type) {ok, 0};};                                                        \
    type type##_Error(error_type error){return (type) {error, 1};};                                             \
    ok_type type##_unwrap(type result){if (!result.has_errored) {return result.data.ok;} exit(1);}               \
    ok_type type##_unwrapor(type result, ok_type or){if (!result.has_errored) {return result.data.ok;} return or;}\
    
//you must call this with a type def to avoid complier checks
#define Result_t(ok_type, error_type, type)\
    Result_t_type(ok_type, error_type, type)\
    Result_t_funcs(ok_type, error_type, type)\
```
something within this code you might not have seen before is the [##](https://gcc.gnu.org/onlinedocs/cpp/Concatenation.html) operator. this operator basically combines two tokens in to one after macro expansion have been done.

the first macro defined here is the `Result_t_type` defined the structure of the result type. this uses a union of both the ok and error type to as these will more then likely be 2 different types and it would just be wasteful having space in the struct for each of the types at the same time as well as this data being mutually exclusive. the only other thing in here is a Bool to tell if the result has errored.

the second macro defined `Result_t_funcs` defines all the functions that the result type implements this also allows for more generalized functions to be added. there are 4 mostly self explanatory functions here.
- `type type##_Ok`: use this if all your code didnt error
- `type type##_Error` : use this if your code did error
- `ok_type type##_unwrap` : assumes the states of the result is ok and gives the data, if not it exits the program with an error
- `ok_type type##_unwrapor` : will attempt to unwrap the result type and if it has an error then it will default to the or arg

lastly the `Result_t` macro combines these 2 macros together. however you maybe be looking at this code and thinking you have defined `Result_t` in 2 places the struct and the macro. well due to the c pre processor not allowing recursive macros (pussies), the `Result_t` as defined within the struct does not actually get counted as a macro call.

# results

running this code with `n1 = 4` and `n2 = 2` gives the following output:
```sh
$ gcc temp.c && ./a.out
6
$
```
and then again running this code with `n1 = 4` and `n2 = 3` gives the following output:
```sh
$ gcc temp.c && ./a.out
$
```
although not extensive tests it shows the basic principal of the code working 

# conclusion
this endeavor in to creating an appropriate replacement to the current c error handling works nicely. however this could benefit from some more extensive testing as well as some more unwrapping functions. for future improvement to this code i will be adding in more variations of the the unwrap function, changing the has_error to an error value so i can implement warns and other lesser errors.
but overall it worked as i wanted it and i will probably continue to use it in the future. 

the git repo link can be found [here](https://github.com/sirlilpanda/c-results-type).

