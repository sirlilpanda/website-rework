---
title: 'the fun niche parts of c'
description: 'the article will go over some of the more less common and useful "features" in c'
heroImage: '../../assets/article_hero_images/c.png'
pubDate: 'Mar 1 2026'
---



This article will be slight less fouced on words and more fouced on the cool niche things c can do or
you can do in c. Most everything in here can be done with most modern c compilers and will include
a combination of both macro shenanigans and "hidden" parts of the c lang. this will not cover the fun
[trigraphs](https://en.wikipedia.org/wiki/Digraphs_and_trigraphs_(programming)) within c as these have 
been removed from the language since all keyboard support all the ascii chars needed for c.

## Bit annotations

Bit annotations are a feature with c that allows you to state the width of an integer type within structs.
As can be seen in the example below all the bit_fields here will only be 4 bits across meaning the total
size of this struct will be 16 bits (you can run sizeof to confirm this), this is excellent within 
embedded systems when memory is a very important fact within your code.
``` c
typedef struct {
    unsigned bit_field_1 : 4;
    unsigned bit_field_2 : 4;
    unsigned bit_field_3 : 4;
    unsigned bit_field_4 : 4;
} temp_t;
```

## the slide operator

The slide "operator" is a funny use of how c process its operators, when looking at the example below
it appears that the `-->` in the while loop is a genuine operator, that reads like 
> i goes to zero
however if you look sightly closer this is actually just a `--` decrement operator and `>` greater than
equally in one. The reason this works is that both the decrement and increment operators will return
the number before or after the operation has happened (depending on what side its on). Additionally, c
does not care about the spacing of the tokens within the language and therefor you can place these
operators right next to each other.

```c
#include <stdio.h>



int main(int argc, char** argv) {

    int i = 10;

    while (i --> 0) {
        printf("%d \n", i);
    }

}
```
## VA macros

VA or variadic macros are a type of macro that allows for an unknown number of arguments, this is 
especially useful for if you want to alias the `printf` function to something else. A use case for this
could be if you want to change the output in an embedded device from a debugger to a file system on 
board for logs when you do a release build of it.
```c

#define eprintf(format, ...) fprintf (stderr, format, __VA_ARGS__)

// these mean the "," is optional and wont be added if no __VA_ARGS __ are provided
#define eprintf(format, ...) \
  fprintf (stderr, format __VA_OPT__(,) __VA_ARGS__)

// or

#define eprintf(format, ...) fprintf (stderr, format, ##__VA_ARGS__)

```


## The strange macro constants

There are several strange but also very useful macro constants that get defined before compilation, 
or at least defined by gcc. Below are these definitions as well as the preprocessor builtins operations

```c
// macros builtins
#define str(s) #s // this converts symbols like varible names in to strings
#define concat(s1, s2) s1##s2 // this is used on code symbols like varible names
#define concatStrings(s1, s2) s1 s2 // yeah strings defined as "something" "somethingelse" will just merge
// the useful ones
__LINE__    // int of the line this is defined on
__FILE__    // full file path this is defined in
__DATE__    // current date during compilation
__TIME__    // current time during compilation
__BASE_FILE__ // the file its in not the file path



// the strange ones
__COUNT__ // increase by one everytime is used
__INCLUDE_LEVEL__ // a constant int for the depth that include files are nested

```

## For each macros

Foreach macros are the perfect thing when you find out they exist. They are used within in some fairly
large libs like [fff](https://github.com/meekrosoft/fff). The basic principle behind these macros are
each of the 10 `FOREACH_x` steps take the next most variadic argument and passes it to the `FOREACH_(x-1)`
macro. The `N_VA_ARGS` is the one that does this step of taking the last arg and passing it to the 
`FOREACH_x macro`. 
If you for some ungodly reason you need more then 10 i have created a script that will
generate the foreach macro for any given length which you can find [here](https://github.com/sirlilpanda/c-comptime-json-fmt-string/blob/main/gen_foreach.py). This one looks different but works in the exact same way. 
```c


#define N_VA_ARGS_(_9,_8,_7,_6,_5,_4,_3,_2,_1, N, ...) N
#define N_VA_ARGS(...) N_VA_ARGS_(__VA_ARGS__ __VA_OPT__(,) 9,8,7,6,5,4,3,2,1,0)

#define FOREACH_0(FN, ...) 
#define FOREACH_1(FN, E, ...)  FN(E) 
#define FOREACH_2(FN, E, ...)  FN(E) FOREACH_1(FN, __VA_ARGS__)
#define FOREACH_3(FN, E, ...)  FN(E) FOREACH_2(FN, __VA_ARGS__)
#define FOREACH_4(FN, E, ...)  FN(E) FOREACH_3(FN, __VA_ARGS__)
#define FOREACH_5(FN, E, ...)  FN(E) FOREACH_4(FN, __VA_ARGS__)
#define FOREACH_6(FN, E, ...)  FN(E) FOREACH_5(FN, __VA_ARGS__)
#define FOREACH_7(FN, E, ...)  FN(E) FOREACH_6(FN, __VA_ARGS__)
#define FOREACH_8(FN, E, ...)  FN(E) FOREACH_7(FN, __VA_ARGS__)
#define FOREACH_9(FN, E, ...)  FN(E) FOREACH_8(FN, __VA_ARGS__)

#define FOREACH__(FN, NARGS, ...) FOREACH_##NARGS(FN, __VA_ARGS__) 
#define FOREACH_(FN, NARGS, ...) FOREACH__(FN, NARGS, __VA_ARGS__)
#define FOREACH(FN, ...) FOREACH_(FN, N_VA_ARGS(__VA_ARGS__), __VA_ARGS__)

```


## defer macros

defer macros yet another thing that is wonderful once you find out its exists, or if you havent heard of
defer you are in for a treat. defer works by allowing some bit of code to run both before and after a block
so say you are opening a file or socket and you need to close it by the end of scope. Instead of writing
the cleanup code at the end you write both the start and end code within the start and end func of the 
defer statement and it does the work for you. This macro works by using the fact `for` statements have both
a start statement i.e. `int i = 0` (the bit of code that gets run before anything in the block is run) and
an end statement i.e. `i++` the statement that runs once the middle has been checked.

and if you are wondering how `int macro_var(_i_) = (start_func, 0)` assigns `macro_var(_i_)` to zero,
so am i, i will update this when i work this out.

```c

#include <stdio.h>

#define macro_var(name) name##__LINE__
#define defer(start_func, end) for ( 		\
	int macro_var(_i_) = (start_func, 0); 	\
	!macro_var(_i_);						\
	(macro_var(_i_) += 1), end) 			


int main() {

    defer(puts("hello world"), puts("goodbye world")){
        puts("im in a deferblock ma");
    }
}
```


## including links in your code

This isnt even a feature nor should it ever be used its just cool, you can just add links in to your code
since the `https:` part is just a goto label and the `//` make everything after on that line a comment.

```c
#include <stdio.h>

int main(int argc,char* argv[]) {

    https://sirlilpanda.studio

    printf("hello world");
    return 0;
}
```

## kwargs in c

With a little macro magic you can have keyword arguments in c. This is all thanks to the fact that 
during struct creation fields can be redefined multiple time with the last on being used. I believe
this is an artifact left during the K&R style era where struct fields had to be defined one at a time
after the variable definition.

So the way this code works, is there is an `internal_print_string` function, that takes in the normal
arguments and the struct that defines all the keyword arguments in it. This function is then wrapped in a
macro, where the default argument of the kwargs are defined where the VA args are defined at the end of
the struct so the previously defined fields are overwritten with the new values.

```c
typedef struct {
    int left_padding;
    int right_padding;
    char* author_name;
} FuncKwargs_T;

#define print_string(str, ...) \
    internal_print_string(      \
        str,                     \
        (FuncKwargs_T){           \
            .left_padding = 5,     \
            .right_padding = 5,     \
            .author_name = "unknown",\
            __VA_ARGS__               \
        }                              \
    )                                   \

static void internal_print_string(char* string, FuncKwargs_T kwargs) {

    printf("%s :", kwargs.author_name);
    for (int i; i < kwargs.left_padding; i++) putchar(' ');
    printf("\"%s\"", string);
    for (int i; i < kwargs.right_padding; i++) putchar(' ');
    return;
}

int main(void) {
    print_string("hello_world", .author_name = "sirlilpanda");

}
```


## Documenting code examples

When documenting code example many people place the examples inside comments above the function. 
however this has one major problem no *syntax highlighting* so instead you can define the example
within a pre-processor directive that will never run i.e. `#if 0`. As if `#if 0` evaluates and
the example code is added i think you have much larger problems. Finally, if worse comes to worst 
and the thing that handles the highlighting where it be an lsp or treesitter or just a lua filter
does highlight it you wernt going to get highlighting anyway if it was in a comment.

```c
static void internal_print_string(char* string, FuncKwargs_T kwargs) {
    #if 0
        print_string("hello_world", .author_name = "sirlilpanda");
    #endif

    printf("%s :", kwargs.author_name);
    for (int i; i < kwargs.left_padding; i++) putchar(' ');
    printf("\"%s\"", string);
    for (int i; i < kwargs.right_padding; i++) putchar(' ');
    return;
}

```

## Include just include a file

When the preprocessor runs and hits your include directive it just reads that file and slaps the
content of that file in your source code. Therefor you can include large data within your source
code while its in another file. This can be very used for things like shaders and bitmap fonts.

```c
// ============== my_text_file.txt ==============
// "hello world"
// ============== my_text_file.txt ==============

const char string[] = #include "my_text_file.txt";


```


## Defining includes before including them

defined run before the includes within the pre-processor and you can therefor define your includes
file header path as a define. This could possibly come in useful if you have different platforms and
only want one include for some reason.

```c
#define PRINTING_H <stdio.h>
#include PRINTING_H

int main() {
  printf("hello world\n");
  return 0;
}
```
## looping over arrays with falsely terminating values

Instead of using a while loop to keep checking if that char isnt null just use a for loop.
NOTE THIS CODE does mutate `somedata`.

```c

char* somedata = "hello world\n";

for (; *somedata; somedata++) {
    putchar(*somedata);
}

```

## all string types

c surprisingly has multiple string types these are the normal ascii strings, L string and u strings
(c++ also has R strings but we only deal in c like sane people).
u strings just tells the compiler that these chars in the string are unsigned. 
U strings not to be confused with u strings tell the compiler that the characters are unsigned ints. 
L strings on the other hand just tell the compiler the characters are just ints.

```c
    char string[] = "hello world\n";  
    char string[] = u8"hello world\n";

    unsigned char string[] = u"hello world\n";  
    unsigned char string[] = U"hello world\n";  
    
    int string[] = L"hello world\n";  
```

## defines can have nothing in them

Just as the title said, all defines are, are just a find and replace and you can replace it with
nothing. Now go enjoy putting `fucking` all over your code. 

```c
#define fucking

// completely vaild
int fucking main(){
    return 0
}

```

## unions for differnt names for struct fields

Instead of using unions for a real purpose, you can instead use them for changing the name of how you
index in to different struct fields. This can actually be quite useful when writing something like a 
vector struct, sometimes the math looks better when its in terms of x, y, z, or maybe you are doing
quaternions and just need something for the imaginary part, or maybe even R, B, G for when you are 
dealing with colours.

```c
typedef union {
    float vec[3];
    
    // these need to stay unnamed
    struct { 
        float x;
        float y;
        float z;
    };
    struct {
        float i;
        float j;
        float k;
    };
    struct {
        float a;
        float b;
        float c;
    };

}Vec3_t;
```

## Implicit delectation

This was a strange bit of the c compiler when it did not treat implicit delectation of function as 
warning, when c99 dropped this was fixed. I believe this was extensively used in some early games, i 
will attempt to find a reference for this and update this page. However, even though i cant show it 
here i have seen this done in early 2000 production code.

```c
#include <stdio.h>

int main() {
  printf("num : %d\n", add(2, 4));
  return 0;
}

int add(int n1, int n2) {
  return n1 + n2;
}

```

## force complier hints

Think your smarter than the compliers branch predictor then you can tell it what way it should
go instead with these builtin functions. These functions tell the compiler that x is going to be 
either 1 or 0 and that's how you should predict it going. The reason for the double exclamation marks
is to ensure that x gets converted in to a boolean before being passed in to the function.


```c
#define likely(x)    __builtin_expect (!!(x), 1)
#define unlikely(x)  __builtin_expect (!!(x), 0)


```

## Yoda conditions

Yoda conditions are a method of catching possible typo in your code before it complies. This works by
changing how you write if statements from `thing to check` `some operation` `other thing` to `other thing`
`some operation` `thing to check`, this normally catches bugs like if only one equals sign was added
instead of 2, as normally the thing you are checking against is a constant value and therefor cannot be
assigned to and errors out.

```c

#include <stdio.h>

int main(void) {
    int val = 32;
    
    // will alway make val 32
    if (val = 32) puts("is 32"); 
    // will error
    if (32 = val) puts("is 32");

    return 0; 
}

```
## vlas can be use to tell the complier that something exists/is not null

i will add additional explantation to this soon once i do a bit more research on it but just no you 
can do this because of VLAs.

```c
// single objects
void func(T *obj); // obj can be null
void func(T obj[static 1]); // obj must exist and cant be null

// multiple objects
void func(T arr[N]); // some obj can be invalid or null
void func(T obj[static N]); // objs must exist and cant be null

```

## k&r styles c this is sadly no longer vaild
k&r styles c was an old style of writing c when the language was still quite malleable, sadly modern
compilers have dropped support for processing this, but you can still use something like setting the
standard to `-std=c99` and it should compile. Admittedly when you look at it, you can see why our modern
style has taken off instead.

```c
// K&R syntax
int foo(a, p) 
    int a; 
    char *p; 
{ 
    return 0; 
}
```

## Auto free in c

This is a feature of gcc and some other compilers that allows for a cleanup attribute to be added to
variable that bind some function to run after it has left scope. This is really useful as a defer statement
instead of the dodgy defer macro that i showed previously.

```c
void cleanup_free(void *p_) {
	void **p = (void**)p_;
	free(*p);
}

void f(const char *str) {
  __attribute__((cleanup(cleanup_free))) char * str_copy = strdup(str);
  // Do something with str_copy
  // ...
  // cleanup_free(&str_copy) is called here
}

```

## string literals
string literals dont have to be assigned to anything to be included this can be useful if you want version numbers directly in the program without exposing them to the user.
notes that this will throw a warn and some compliers might remove it all togeather.

```c

void main() {
    "hello world";
}

```




## extra reading and where i got these things from
- Programming in Modern C with a Sneak Peek into C23 : https://www.youtube.com/watch?v=lLv1s7rKeCM
- A look back at original style C : https://www.youtube.com/watch?v=uOKzkr7uv9E
- Other Built-in Functions Provided by GCC : https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html
- Specifying Attributes of Variables : https://www.cse.unr.edu/~sushil/class/cs202/help/man/gcc-2.7.0/gcc_82.html
- Kwargs in c : https://gist.github.com/RickBarretto/ed0065c1a2144deb4b3250ce125956b0
- Common Predefined Macros : https://gcc.gnu.org/onlinedocs/cpp/Common-Predefined-Macros.html
- Foreach macro in C : https://sgf4.github.io/posts/foreach-macro/
- Yoda_conditions : https://en.wikipedia.org/wiki/Yoda_conditions
- force branch prediction : https://stackoverflow.com/questions/30130930/is-there-a-compiler-hint-for-gcc-to-force-branch-prediction-to-always-go-a-certa

