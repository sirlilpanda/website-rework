---
title: 'my journey in to trying freeform electronics'
description: 'freeform electronics is the act of soldering components together by either using the leads of the components themselves of solid wire'
pubDate: 'Apr 12 2026'
heroImage: '../../assets/article_hero_images/src/assets/article_hero_images/freefrom-soldering.png'
---

Recently I've been seeing a few bit of freeform electronics piece appear across my timeline.
These pieces of freefrom electronics are normally circuits made with the use of breadboards, pcbs, perfboard or even a copperclad board for manhattan prototyping, infact these pieces are designed to be created with no board what so ever.
So instead of giving the components rigidity through use of some backing board instead you give then rigidity through use of solid wire like that found on the legs of resistors.
Therefor this method allows for all the connection between components to be fully displayed with nothing hidden.
This inability to display now allows for more creative routing of circuits as well as the ability to travel in more unique directions, and therefor allowing artist aspects to be incorporated within to the design.
I also argue that this form is the panicle of circuit design knowledge as on a PCB you can get away with a lot of bad practices by just having a ground plan. 
Where with this technique you have to know were your returns paths will be, if your signal traces will radiate EMI, parasitic capacitance, inductance, crosstalk etc. .
Although you luckily shouldn't have to deal with current carry capacity of your wires and if you do i am scared of what you are making.

So my plan to create a freeform piece of electronics was to get an off the shelf digital clock circuit and attempt to route this into a piece inspired by [this piece](https://x.com/hill_cape/status/2022625115872321687) I saw from an account called @hill_cape.
The primary reason for an off the shelf module was I wanted a known good circuit to build around before designing my own, although I do have idea which I will discuss later.
The first part of the clock I decided to create was the seven segment display module as this would not require any additional wire just the use of the resistors.
As can be seen from the image below this technique can already look great even in simple use cases.
However i did overlook the complexity of creating and routing the "wires" as there tends to be a large amount of trial and error. 

![image of 7 segment display module](/freeform-soldering/freefrom-soldering.png)

Although during the creation of this there were a few tricks that i picked up very quickly.
- In this medium solder is your temporary connection do not be afraid to desolder something only to resolver it again.
- Avoid the use of magnet wire (that is the very thick dark copper wire) as the enamel coating on this is so thick it takes the use of a file to get through it. Try to stick to brass rod both 0.8mm (1/32") and 1.6mm (1/16") thick rod are excellent to use, you can also get nickel coating steel however i am yet to try this.
- Get a good pair of plyers. i picked up a set of square bending plyer for this and they worked a treat especially for repeatability
- PLAN YOUR DESIGN, although i have been free forming this design so far, i suggest you actually plan the layout of the design at least slightly before creating it, although you could get some more organic shapes without have a plan in mind.
- make jigs, if you have any kind of repeated pattern a jig to correctly space things will add a lot to the aesthetics of your design
- have plenty of work holding tools, trust me you will need about 8 helping hands, and i would really suggest you get the ones with magnets in the bottom.
- finally, write things down make sure if you take your current prototype apart to squeeze in another wire or replicate your wiring make sure you know where is meant to go back to.

So what is the plan when i finish the clock. 
The next project I have in mind using this technique is an stm32g4 based usb DAC.
Yes a full microcontroller with 0.3mm pin width and 0.1mm pin spacing I have soldered these pins individually before so thats not what im worry about im more concerned with the high speed I2S singal for the DAC.
Another idea is a full discrete computer like [ben eaters breadboard computer](https://eater.net/8bit) however i will take it one step further and make a display using an LED matrix.
Finally, my last crazy idea for the moment is the creation of a see though keyboard this shouldnt be as difficult since the solid wires should allow me to create a very light and robust frame.



## links to things discussed
- https://www.youtube.com/watch?v=UV9_SqKqZQ8
- https://www.petervogel-heritage.de/en/start-en/
- https://www.youtube.com/c/EirikBrandalf
- https://eirikbrandal.com/
- https://www.youtube.com/user/mohitbhoite
- https://bhoite.com/sculptures/
- https://x.com/i/status/2022625115872321687
- https://qrpme.com/docs/K7QO%20Manhattan.pdf
- https://eater.net/8bit
