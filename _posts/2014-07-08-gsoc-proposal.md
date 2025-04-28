---
layout: post
title: How I wrote a successful Google Summer of Code application for Biopython
date: 2014-07-08
tags: GSOC, internship, archive
description: My thoughts on writing a quality Google Summer of Code submission.
---

There are many resources speaking generally about qualities of a successful GSoC proposal and my first suggestion to others is to read those resources. The reason I have chosen to write this blog post is simply to give my own limited insights into the process. It is worth saying that every open source project is going to have their own priorities and set of requirements so my observations, and those I've linked to, may not be generally applicable.

 * [Drupal: How to write a GSoC proposal](https://www.drupal.org/community/contributor-guide/reference-information/google-summer-of-code/how-to-write-a-gsoc-proposal)
 * [Gervase Markham: How Not To Apply For Summer Of Code](http://blog.gerv.net/2006/05/how_not_to_apply_for_summer_of/)
 * [5 Advices to get Your Proposal Accepted]( http://www.di.ens.fr/~baghdadi/TXT_blog/5_advices_to_get_your_proposal_accepted.lyx.html)

With that out of the way, I can get to my own experience. I have used Biopython for about a year after deciding that manually parsing uniprot data wasn’t worth the trouble. When I heard that Biopython would be accepting a GSoC student I immediately decided that I would field a competitive application. The project idea posted by organizers regarding implementation of a lazy loading parser was right up my alley since it targeted a module I was familiar with and would implement functionality that should be helpful to many.

### Preparation

By far the most difficult part of the application was deeply reading the code base. I knew that my proposal couldn’t simply discuss how to implement a new feature, I had to discuss the feature’s context within the existing codebase. For a week or two I would spend about an hour a night casually browsing through the github repository. I drew maps tracking relationships between classes, I drew a map tacking file references to lines of code and methods. I figured out how pieces of code were reused in unexpected ways by modules that were clearly written much later. I sought to understand the logic of several parsers that would need to be reused. Early on I became discouraged, I got lost in the code and in despair I decided to try again next year, luckily for me when I resumed my reading later I was able to solve the puzzle. I cannot stress enough how important the code reading was. Even now I have a clear picture in my mind of the general layout of my target module and its connection to other parts of Biopython. Without this experience there is no way I could ever write a successful application.

### Writing a proposal

Once I deemed myself ready to write a proposal, I wrote an outline. I fleshed out some details of what I liked and noted places where I had difficult decisions to make. At some point I just made arbitrary decisions even if several options seem valid. After writing for a bit and seeing several paths forward, I brought my thoughts and questions to the Biopython mailing list.

### Feedback loop

The helpful responses of Peter and Bow gave me insights into making a better proposal. Some of my design choices were endorsed, others were not, still more aspects of the proposal I had not anticipated were brought up. I spent another couple of evenings refining my proposal and then I submitted it… NOT!!! My next step was the same as my previous. I posted my proposal publicly on the mailing list and requested comments. Still more helpful points were made and after further edits, I submitted my proposal for GSoC evaluation.

### General thoughts on the GSoC application process

Technical ability: show, don’t tell. For individuals like myself, without formal software engineering training, the best way to prove that you can code is by simply proving that you can understand complex projects and competently design extensions. By leading the conversation in a manner that demonstrated I was technically versed in the Biopython project, I was able to avoid an extensive conversation about formal qualifications. Had I demonstrated a loose grasp of important concepts in programming or Biopython, I am sure that my proposal would have been ignored. Sometimes it is good to overcompensate.

Understand the audience. The proposal evaluators were many of the same people on the developer mailing list. By understanding their thoughts on my project I was able to write a much better proposal. While Google administrators and other Open Bioinformatics Foundation members were involved in the evaluation, it was Biopython developers that would judge the technical merit of my proposal.

Go all-in. Many guides on GSoC proposals assume you are just looking for any internship. My strategy was to seek this specific internship. By taking my time to understand the codebase, understand the problem, and interact with developers I was able to write an incredibly targeted proposal. I exclusively targeted the Biopython project and I doubt that I could have written more than two applications of this quality in the given time. While Google allows for up to 5 applications, I suspect that many people submitting five applications are not putting the necessary time into each one.

Realize you’re not objectively superior. At the end of the day, only the evaluation committee can say why one specific proposal was chosen over another. When several competent people all submit high quality proposals there are many factors that influence the results: whether or not a suitable mentor is available for a project, whether or not you proposed a design similar to one that a lead developer had in mind, whether or not your school’s schedule allows full participation. At some point, you do everything you can and you let fate decide the rest. I was lucky enough to be selected. I’ll leave it at that.
