---
title: 'the update to my website'
description: 'talking a bit about the update to this website'
pubDate: 'Apr 4 2026'
heroImage: '../../assets/article_hero_images/webstite-rework.png'
---


So as you might have seen this website looks different from the old one (which can still be viewed here https://the-website-edq.pages.dev), that because i have finally gotten around to updating it.
the first thing you probably noticed is the new banner.
This was done entirely using html and css and a fair amount of javascript.
javascript was used since each of the stars and each part of the clouds are an individual html element.
Therefor the website would be sending over 200 divs over the air per load, which isnt the best for networking performance.
Therefor these elements are generated client side.
I was tempted to seed the random number generator
for the stars and clouds so everyone could see the same thing each day (i still might implement this).
if you want to implement something similar you can have a look at the source code [here](https://github.com/sirlilpanda/website-rework/blob/main/src/components/Header.astro#L41).

However the gist of it is, on page load both the stars and clouds are added to sky div with the former getting hidden as the page always load on the light mode.
The stars are generated around the center of the div along to the edge of the div and are then animated by rating 180degs around the center since if they rotated 360degs they would end up being hidden half of the time.
the animation itself as created using the [KeyframeEffect API](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect) which allows for animations to be added on the a html element through javascript itself. Adding the animation through javascript rather than css allowed for the random radius of the stars as well as the random start point add twinkle.
The stars each have a slight white box shadow around it to simulate that scatter of the light and space bit interfering with the incoming light.
I originally wanted this to not be white and instead be a random colour temperature value but after having a look at some of the code for that it sounds like a pain, so whit is is for the moment.
But enough about the stars what about the clouds.
The clouds themselves were implemented in a very similar way.
white circles that move a cross a background.
these too having another white box shadow to emulate the scatter that occurs with clouds.
Each cloud itself is made out of 3 to 11 segments or bit of fluff.
Each of these segments then move around a center point ever so slightly. 
This was done to hopefully replicate the slow movement and changing of clouds as they pass over the sky.
you may notice if you use inspect element that the bounding box clouds pass behind the the main background.
Normally this would cause the clouds clip and be rendered on the main page outside of the window.
to fix this i originally though i would have to use a clip path in order to cut out a spot to be rendered too. 
However since clip path doesnt work on absolute positioned elements i instead surprisingly used `overflow hidden` which gave the same effect.
To stop the clouds for popping in to existence once they have exited the other side of the webpage the trick was to start the animation a decent amount out of the view port.

Next the window frame. This piece was added after a discussion i had with my good mate [jordan](https://jordanhay.com). This was about how a website should be something that you just look at it should be a place you vist. So taking this advice i decided to make the website feel more like a place that could actually exist, somewhere that you could see your self being in. To accomplish this first adding the farme made it feel less like just a cool banner and instead like some high up windows in some building.
Next i realised i needed some way to swap between dark and light mode. Since dark mode and like mode were both changed the background of the header to different times of days.
Therefor due to this relation to time i decided a clock was the best way to do it.
Addtionally that clock also displays your current time.
finally, the website icon, since the header is now a window just putting the icon itself there would not be thematic as it would just be floating (ignore the other headers these might be changed in the future). So making the icon in to a stick by giving it a slightly less opaque background allows in to fit in perfectly as well as a slight tilt as no one stick stickers on straight.

