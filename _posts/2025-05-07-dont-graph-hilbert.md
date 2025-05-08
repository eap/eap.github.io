---
layout: post
title: Don't Implement a Hilbert Curve as a Graph
date: 2025-05-07 22:30:00
tags: fail, math, bad-code
description: I made a mixed-order hilbert curve the worst way possible.
---

Hilbert curves are always rendered by their order, and there's plenty of cool
animations and images of the various orders and how they overlay each other.
I had a neat idea: one could use a "mixed order" Hilbert curve overlaid on an
image or map, and you could see how the Hilbert curve tiled down to overlap
the target point in an index.

In my mind, a graph seemed like an obvious data structure because... hierarchy!
I borrowed the four-type production rules from Wikipedia and allowed each curve
element to have four child nodes. I figured I'd bang it together in a couple 
hours. I sort of did—but I hate it all the way.

This approach relies on a rat’s nest of highly specific graph traversals with
methods like `shiftLeftPoint`, `shiftRightPoint` and, interestingly I needed
`shiftRightCurve` but didn't need the left curve... go figure. Also the curve
self renders which felt like a great idea until you have to implement delete.

Hindsight being 20:20; it should have been a linked list, because why on earth
would a representation of A FANCY LINE need to be anything other than a linked list?

Anyway... if you want to see the worst Hilbert curve, here it is. Click the little blue
dots to see "mixed order" curves. Once you see it, you'll understand why you haven't
seen it anywhere else.

<div class="container" style="max-width:700px;margin:40px auto;padding:24px;background:#fafafa;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.08);text-align:center;">
<h1 style="margin-bottom:16px;font-size:2rem;color:#222;">Hilbert Curve Visualizer</h1>
<label for="order-select" style="font-size:1.1rem;margin-right:8px;">Order:</label>
<select id="order-select" style="font-size:1rem;padding:4px 8px;margin-bottom:20px;">
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
</select>
<canvas id="hilbert-canvas" width="600" height="600" style="display:block;margin:24px auto 0 auto;background:#fff;border:1px solid #ddd;border-radius:8px;"></canvas>
</div>
<script src="assets/js/hilbert-graph.js"></script>
