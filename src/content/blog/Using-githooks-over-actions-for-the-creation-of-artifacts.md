---
title: 'do the work yourself not the server : Using githooks over actions for the creation of artifacts'
description: 'why make a server do work when you can do it yourself'
heroImage: '../../assets/article_hero_images/hook.gif'
pubDate: 'Feb 15 2026'
---

I know that's a title and half, and now you are wondering "*why would I do something myself rather than a server*".
But before I get answering that question, i will start by breaking down and defining each part within that title to get a clearer image on exactly what I'm talking about (since there are quite a few buzz words in there). 
To start what is an artifact, artifact can refer to wide variety of outputs such as header files, documention, test suites, the source code itself, the standalone executable, etc. 
So you can see by the definition artifacts although vague are a key and necessary part of development. 
So why auto create them, the answer is simple because you **will** forget.

Now that the second part of the title is defined lets define the first part, githooks vs actions. 
Actions are a key idea within Continuous Integration and Continuous Delivery (CI/CD) where on every small change to your main branch (CI) redeploys the code (CD), this could be running tests on your code, compiling your library, redeploying your website, generating new documentation, formatting your code etc. 
However these tend to run on automation servers such as jenkins, github actions, gitea actions etc.
Where githooks are bash scripts that run either before or after some command you run with git, i.e. `git push`, `git commit`, `git add` and therefor run locally on your machine. Addtionally, Since githooks are just actions they can do all the things actions can do.

So as you can see both githooks and actions and are both very powerful. 
However why pick hooks over actions, one main factor *simplicity* actions rely on a server to preform them and for the steps within those actions to be efficient. 
Addtionally, to run an action you have to setup and enviroment for running the script which takes long to setup and passing generated artifacts between steps can become a headache especailly when you run multiple at one time.
Although, I'm not saying you should never use actions, just the vast majority of things you do with actions can be done with a git hook before you push your code.
The time and place where you should be setting up actions is when you *need* one source of truth for your design. 
Since actions reduce the "it works on my machine" issues by forcing you to set up a system where the code can run each time it creates a point where your code can be testing on a system that is not your own.

What im trying to get at is actions should be used for things like static site generators, compiling the website in to an HTML file on your machine then hosting it somewhere else or building and auto committing documention for your projects rather than having an action do it. 
A great example for this and the reason I'm writing this was the comparison between my [kicad project template that used actions](https://git.sirlilpanda.studio/sirlilpanda/kicad-project-template) and my [kicad project template that doesnt](https://git.sirlilpanda.studio/sirlilpanda/kicad-project-template-actionless).
These are templates projects for kicad a pcb design tool, with the primary reason for these templates needing to incorporate some form of tool for added the generated schematics, PCB gerbers, images of the PCB itself and the running of the electronic and design rules checkers. 
However the template project that uses actions can take up to 2 mins to run on GitHub servers ( I still have yet to properly set it up on Gitea), but the action one runs in about 30 seconds before it pushes up to Gitea or another forge service.
so to summarise, actions are not useless quite the opposite however there are a vast number of use cases where a simple githook before pushing is all that is needed. 


githooks can also be run on a server like actions but thats too much to cover here.

# extra resources you man want

- CICD : https://en.wikipedia.org/wiki/CI/CD
- githooks : https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
- actions : https://docs.github.com/en/actions
- why actions may not be that good : https://ziglang.org/news/migrating-from-github-to-codeberg/