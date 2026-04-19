---
title: 'my perfect notebook'
description: 'recently I purchased some very nice notebooks from an art supply store however they are not perfect yet, so I will outline the changing I am planning on making to them in order to make them suit my needs, as well as requirements for my perfect notebook'
heroImage: '../../assets/article_hero_images/notebook.png'
pubDate: 'Apr 19 2026'
---

A while back I bought a Samsung Galaxy phone with the stylus partly because I wanted a new phone and partly because I thought it would use useful to take notes.
However, I found that when I would take notes on it the notes would just seem to fall into the bottomless pit (metaphorical bottomless, I have filled it with music) that is my phone.
so in my final year of unit I started taken notes on paper instead of my phone or even an Ipad and found it a lot better. 
Although I wanted a better writing experience since I have started doing more lab work where space tends to be at a premium.
Therefor I recently purchased the [Ecoqua Original notebook](https://fabriano.com/en/product/ecoqua-original/) from fabriano.
These notebooks are wonderfully sized somewhere just smaller than a sheet of A6 with as well as excellent paper quality sitting at 90gsm[^1] with no bleed through.
Before this I was using [paperblanks notebooks](https://www.paperblanks.com/en/) and just like the Ecoqua they too have excellent although slightly thicker sitting at 120gsm as well as some very pretty colours. 
Additionally, they also have a built-in document pocket and well as book ribbon and elastic or a clasp to hold the notebook close. 
However, the largest downside of these notebooks were even in their smallest sizes (~A5) they were still too thick at 18mm with about 7mm of that coming from the covers.
This thickness of the covers also makes it very difficult to hold a pen on it as well. 
So for a notebook that can be crammed in to a pocket paperblanks notebooks just arnt feasible unlike the Ecoqua which are around 4-5mm thick.
However, This is not to say the paperblanks notebooks are bad they are great a journaling notebooks (which I believe is what they actually sell them as).
But this is not to say the Ecoqua doesnt have downsides too, the largest one being they are paperbacked and for a notebook I carry around there normally isnt a hard surface near when I intend to write something down.
So that is the main problem I want a hardcover notebook that I can cram in my pocket and hold at least a pen as well as the obligatory of looking pretty.
To convert these desires easier to in to a set of requirements using the [EARS format](https://alistairmavin.com/ears/):

- The notebook shall be no larger than a sheet of A6 paper
- The notebook shall be no thicker than a phone with a case (*this is mainly because most things are designed with phones in mind*)
- The notebook shall contain some visual appeal
- The notebook shall have a documents pocket
- The notebook shall have a hardcover
- the notebook shall have a location to store a pen

Now time for the more gimmicky things I keep thinking would be nice in a notebook:

- When the pen is removed from the notebook, the notebook can then be opened 
    - this is primarily because when you open a notebook you intend to write in it.
    Therefor requiring that the pen is removed in order to be opened would allow for a cleaner solution then a piece of elastic or a clasp that might not close if too many things are in the notebook
- The notebook shall contain storage for additional drawing implements such as stencils and straight edges 
- The notebook shall have the ablity to change the paper within it.

for a design to meet these requirement I have created an [openscad script](https://git.sirlilpanda.studio/sirlilpanda/parametric-notebook) that generates a notebook based off of a page size.
This notebook uses a hinge based design I originally saw from a creator called [dogteeth](https://www.dogteeth.co/) who created a notebook based off a fence hinge.

![alt text](/perfect-notebook/notebook.png)

However, I believe they did not take full use of the hinge designs additional the pages with in the notebook feel too tall.
Although I do believe this is just due to their design using off the shelf parts and not custom fabrication.
Therefor my plan is to take this same design expand out the metal holding the hinge to give more space for the paper.
Additionally, I plan to create a hole through the hinge and using that to hold the pen much like a spiral bound notebook, this would also allow for the possibility of cutting a keyway in as well, meaning when the pen is inserted the notebook cannot open.
However, this notebook design does have a major flaw and thats the hinge itself, when the notebook fully open the hinge sits in the middle causing there to be a bump in the middle of the notebook.
One method of solving this could be to change to more of a notepad instead, but this changes the use of the notebook to a notepad, since notebook are there so you can look back through your notes where notepads are there to write notes down then discard of them.  

There are other possible designs I may still look in to like lether bound notebooks where I might just embed some piece of hard material in, or maybe a spiral notebook with some hardcover.
However for the mean time I will continue development on this current notebook possibility trying to find an alternative hinge mechanism with possible future updates to come.

[^1]: gsm or Grammage is simply the ratio of the mass (g) of the paper compared to its area (m<sup>2</sup>), this unit does correlate to the thickness of the paper however higher gsm papers can be thinner then lower gsm papers.
