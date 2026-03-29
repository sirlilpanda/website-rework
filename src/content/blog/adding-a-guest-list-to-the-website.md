---
title: 'Adding an guest book to my website'
description: |
    to attempt to give some more life to my website and instead of letting it sit as a static statue one the internet, i have decided to implement a guessbook so i can see the people who are checking out my website and so i can check out theirs if they have one.
heroImage: '../../assets/article_hero_images/guest_book.png'
pubDate: 'Mar 15 2026'
---

Guest books on websites have been around since the 90s. They were originally created so to allow for general vistor comments on your website, since at that point social media hadn't grown to the point it is now. Therefor I have decided to create a guestbook on my website as part of it rework.Currently, the only way people could leave feedback would be to open an issue on git or email me. These methods of feedback both feel inadequate and not the right tools for the job. Emails would allow for me to see vistor comments but other people could not see them less I add them to the website and that doesnt feel like a vaild feedback its more like cherry-picked corporate reviews. issues on git is another option for it however those are out of the way and not easily accessible as well as those issues should be for things that are wrong with the website. 

Now on to the implementation of this new feature. Unlike the other sites that have a guestbook like on neocities, that use something like atabook in the backend, I have decided to go the hard way by creating my own. Luckly for me I already use Cloudflare to host my website (even though I do have my own infrastructure I could run it on but thats a story for another day). Because of this i have access to Cloudflare's D1 storage objects so I dont have to deal with hosted a database and keeping that secure, even though there will be nothing of note on it. These storage objects are an SQL database that exists in Cloudflare's servers, however there is one major difference between this database and other databases. Cloudflare keeps these databases are serverless and not have an external endpoint to access them. Instead, these D1 databases have to be binded to the process locally through environment variables. This not only keeps them secure but also stop any api keys from being exposed within a repo. However, there are downsides to using this type of storage mainly the hidden costs of running it, although it would take a very long time till i reach the cap of when i would have to start paying, per day Cloudflare provides 5 million free reads and 100,000 free writes, and 5GB of free data. This paired with some light rate limited should allow the guestbook to run completely fine without being charged 

So how did i implement this, to start i first tried to use astros own DB abstraction layer since it used drizzle ORM under the hood and cloudflare d1 storage objects support drizzle ORM as a first class interface. However, astro abstracts out drizzle client too far for me (a non web dev) to be able to use it with Cloudflare, there might be a way too there might not be. therefor i instead followed a tutorial by kevin kipp on adding it to my astro app, upon completing that i changed the schema to be an ID, a name, a optional link to their own website, a message they want to write and lastly the date written. This was the minimum amount of information needed for a guest book log. Yes in theory you could remove the website and have people include that in their message but that felt too disconnected and people would then have to shoe horn it in to their comment and that didnt feel natural for the user. i might also try add an option for the 88x31 website buttons as well, but that will be in the future.

You may have noticed that the guest book isnt here. Well thats because i have started yet again another new repo for this website, mainly due to the fact that astro has changed within recent versions and just starting again and removing the current tech debt i have is the easier option.

but if you want to sign it before anyone else see it on this website then you can check it out here https://website-rework.sirlilpanda.workers.dev/ yes its very unfinished im attempting to work on a layout for it since top bar is just not the play any more. 

# Resources
how to actually implement a cloudflare D1 storage with astro : https://kevinkipp.com/blog/going-full-stack-on-astro-with-cloudflare-d1-and-drizzle/
astros own DB : https://docs.astro.build/en/guides/astro-db/
free guestbook service : https://atabook.org/
## other sites with guest books
https://c-nder.neocities.org/guestbook
https://advelos.moe/
https://melonking.net/melon?z=/hidden/loading
