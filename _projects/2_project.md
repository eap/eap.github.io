---
layout: page
title: EvanTopo
description: Hiking & topographic maps, built on open data.
img: assets/img/evantopo/route-builder.webp
importance: 2
category: work
giscus_comments: true
related_publications: false
---

In the summer of 2025 my brother and I hiked to Blue Lake in the Indian Peaks Wilderness.
We wanted to continue on to Little Blue Lake, and followed a trail marked on AllTrails
that turned out to be an unmaintained rock scramble. We ended up exhausted and in
technical terrain, which was a dangerous place to be, and wisely worked our way back out.

When I looked into it afterwards I found that the trail was an OpenStreetMap way. It was
unofficial, tagged as a "user path", with an approximate SAC rating of T5. The app had taken the trail from OSM and hidden the
annotations. My guess is that they don't want users to know the data is lifted from an
open source project.

I've been thinking about how to build an alternative ever since. Then AI and agentic
coding became a thing.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/evantopo/route-builder.webp" title="Route builder" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/evantopo/flatirons-3d.webp" title="The Flatirons in 3D" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A route drawn from the Chautauqua Trailhead, and the Flatirons in 3D with aerial imagery.
</div>

So [EvanTopo](https://evantopo.com/) is really two experiments. Can I build something in
my spare time that should, by all means, take several years of old-school effort? And can
I do better than the alternatives, not by reverse engineering them, but by making
something that is actually the better choice?
