---
layout: post
title: Dumbing Down my Smart Phone
date: 2025-03-16 17:39:00
tags: smartphone
description: How I made my smart phone a little dumber.
---

Many of my friends have endured my complaints about screens, social media, smartphones and the over-use of technology. Also, on many occasions I’ve been observed sporting a flip-phone and claiming that I am "switching to a dumb phone" only to later switch back and rationalize this temporary state as a "smart phone detox." The problem is that smartphones have become inextricably woven into our lives; basic tasks like logging into a work computer, navigating to a new location, or even turning on the sprinklers often require one. Switching to a flip-phone solves one problem but creates a host of new ones. In this blog post I will describe my most successful approach to declutter my digital life.

I’m not going to make the case against smartphone overuse here since others have done it better. Shortly though, screen addiction is associated with neuroticism, depression, anxiety [1](https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2020.599241/full), altered perception of time [2](https://www.sciencedirect.com/science/article/abs/pii/S0747563217306702), brain structure abnormalities [3](https://pubmed.ncbi.nlm.nih.gov/36498362/), impaired memory, accelerated neurodegeneration, and risk for early onset dementia [4](https://pubmed.ncbi.nlm.nih.gov/35164464/).

Even without consdering these troubling scientific findings, I can see the problem in my own life. I want to engage with the world and my family more mindfully and with fewer distractions.

## Goals

The core problem that I’m addressing is passive dopamine-triggering content consumption. These activities should be difficult or impossible.

- Media feeds such as news, social, and video
- Online shopping
- Invasive notifications

I must maintain critical or highly useful features whose replacements are expensive, inferior, or nonexistent. These are the features that make flip-phone ownership difficult to maintain.

- 2-factor authentication tools; required for my job.
- Email
- GPS navigation and maps
- Smart-home features such as my sprinkler system.
- Online referencing and search.

There’s an obvious tension between some of the activities I’d like to eliminate and others I’d like to keep; having a web browser immediately grants access to all sorts of online time wasting.

## Adding Friction

My strategy is not entirely unique; add friction into the equation making easy rewarding tasks much harder to initiate. Unwise and unwanted activities will still be possible but will require frustrating setup, giving myself time to evaluate the intention and removing the "instant" from instant gratification.

Uninstalling time-wasting applications might seem obvious, but Android makes this hard with two of the largest time-wasting applications; YouTube and Chrome. Interestingly that creates an opportunity. Because uninstalling these applications is so difficult it pairs the action of reinstalling them with the future obligation to do a tedious task, thus it adds an additional commitment device [5](https://en.wikipedia.org/wiki/Commitment_device) into the mix.

### Uninstalling Chrome and Android

Activate developer mode on your phone by navigating to "Settings" > "About phone" > "Software information" and tapping the "Build number" seven times rapidly. You will be prompted to confirm that you have enabled developer mode.
Install Android’s debugger. On Ubuntu run sudo apt-get install android-tools-adb android-tools-fastboot
Connect your phone to your computer.
Run the ADB shell; sudo apt-get install android-tools-adb android-tools-fastboot

```
# From the shell, show all users on the phone.
my-ubuntu-laptop:/ $ pm list users
Users:
    UserInfo{0:Evan:4c13} running
    UserInfo{10:<my-work>:410} running

# Show target packages
my-ubuntu-laptop:/ $ pm list packages --user 0 | grep -e youtube -e chrome
package:com.google.android.apps.chromecast.app
package:com.google.android.apps.youtube.music
package:com.android.chrome
package:com.google.android.youtube

# Uninstall youtube and chrome.
my-ubuntu-laptop:/ $ pm uninstall -k --user 0 com.google.android.apps.youtube.music
Success
my-ubuntu-laptop:/ $ pm uninstall -k --user 0 com.google.android.youtube
Success
my-ubuntu-laptop:/ $ pm uninstall -k --user 0 com.android.chrome
Success
```

### Replacing Chrome with Via

While Chrome is quite useful for wasting time, it is also useful for essential smartphone features and removing it can be a problem. I have replaced Chrome with [Via](https://play.google.com/store/apps/details?id=mark.via.gp&hl=en_US) which is a very effective browser but includes the option to clear cookies, history, and preferences every time the application is closed. Google searches and basic online referencing is easy but interacting with media websites is substantially hindered by missing login cookies and auto-password.

## Did this work?

Time will tell if my latest strategy works well in the long term. About a week in and I’ve observed a great deal less idle phone usage although that number has not dropped to zero. I'm encouraged that my phone is still doing all the things it must do and wasting time remains tedious and unfulfilling. Time will tell if this is successful in the long term; there's always a risk that I will "lazy-engineer" shortcuts around my friction. In any case, I’ll be sure to post an update.
