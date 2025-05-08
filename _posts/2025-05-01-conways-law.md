---
layout: post
title: Conway’s Law and Publishing Android Apps
date: 2025-05-01 00:30:00
tags: Android, JCSDA
description: By referencing an old computer scientists my vague gripes sound smart.
---

At JCSDA, we recently launched a new API for our R2D2 metadata tracking system
(the blog post is in the works, minimal spoilers ahead). Before our launch, our
testbed application workflows were directly accessing our metadata database to
get what they needed. No abstraction. No safety net. Updating schemas felt like
defusing a bomb while other people wacked it with a hammer. It was fragile, and
we knew it.

We took the time to build a REST API. A real one. With nouns and verbs,
structured responses, and the assumption that consumers should not know or care
how the data is stored. Among many other motivations we were working to avoid
“shipping the database”. After all, APIs should be designed around user needs, not
a schema. If users have to understand the ERD to use your API, you’ve already lost.

That launch was early April… then a few weeks later week I laid eyes on the Google
Play publisher console for the first time.

### Conway's Law and Google Play Console

I don’t know who needs to hear this at Google, but the Google Play Publisher Console
is a perfect case study in Conway’s Law. As a reminder, since (for me) Conway’s
law exists in that dusty basket of poorly remembered aphorisms;

> Organizations which design systems are constrained to produce designs which are
  copies of the communication structures of these organizations. -Melvin E. Conway

In other words, if five teams each own a part of the system and don’t talk to each
other much, you’re going to feel all five of them when you try to use the product.

__Example One: Testing__ - In order to release a new application in Google Play you
have to go through an internal testing process. This is conceptually simple: you
tag a release and you authorize a few people to try out your app before unleashing
it on the world. But the console experience makes this feel like configuring a
particle accelerator.

You’ve got "tracks", which are testing categories although the UI has hardcoded 3
primary tracks which makes the need for a track management dialog entirely
superfluous. If there is a track editor, it has been lost to history or hidden.
Tracks point to releases and to user groups (located on separate tabs). Users are,
apparently, google groups which are managed only partially in the console. Releases
are binary release candidate bundles. Creating a track from scratch is, gracefully,
a guided process. That handholding later backfires later because track management
does not benefit from the setup guide. None of the concepts are surfaced clearly
and the pages seem to have been documented by developers not entirely aware of
the rest of the process.

I’m pretty sure the “Testing” section has passed through at least numerous
reorganizations and product managers and I doubt (hope?) it got to the current state
under a single unified leadership vision.


__Example Two: Monetization__ Setting a price for your should be a one-screen task. It’s
not. As with many things it requires hopping between Google Play Console and Google
Payments. Want to set a support email? That’s in Payments. Want to set a support address?
Also in Payments. Primary address? Play Console of course. Want to select a payments
profile? Play Console. Set a price? You need to define a price group first! This isn’t
feature separation, it’s an org chart separation. It’s the software equivalent of
being transferred between departments when you call customer support. Every team
owns a slice of the flow, and as a result, no one seems to own the experience
end-to-end.


### An Arm Tied Behind Their Back

Let me be fair here: Google is a massive company. The tech infrastructure (TI) stack
is a beast and is subject to extremely high standards (often problematically high since
b2b apps rarely have 100 million concurrent users). Internally, there are rules,
checks, policy enforcement tools, and review systems that make even the simplest
feature launch non-trivial. Additionally, don’t blame any engineer for not wanting
to take ownership of something expensive and tedious like payment address verification.
No one wakes up wanting to be “the address guy” (shout out to my literal first job in
tech where I was the address guy, yeah it sucks).

Some of these problems are just the cost of being Big Tech. But others feel fixable.
Linking a test group to a release candidate shouldn’t require navigating through six
disconnected pages and three different mental models. That’s just bad experience design,
and it’s the kind that emerges when microservices let every team optimize for their own
context instead of the user’s.

Microservices are great for scaling teams, but they also calcify boundaries. That
organizational weight doesn’t disappear, it just shifts onto your users. When every
team gets to design their own little universe and no one takes responsibility for the
galaxy, things fall apart.
