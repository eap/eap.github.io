---
layout: page
title: 1990 F-150 Restoration
description: I bought a truck!
img: assets/img/truck/truck_1.jpg
importance: 1
category: work
related_publications: true
---

## I bought a truck!

In the first week of January 2025, I flew to Los Angeles and purchased a
1990 Ford F-150. My 2016 Chevy Colorado had been good to us, but mechanical
issues had been increasing over time, along with repair costs. My concern was
that eventually it would need a new engine; the original engine could
not be rebuilt. Rather than purchasing a new vehicle that would fall victim
to the same cycle of wear and replacement, I decided to go for an older
vehicle built in such a manner that I could repair it (or a professional
could repair it) as needed.

The truck is a 1990 F-150 with XLT with the venerated Ford 300 inline-6
cylinder engine. It had 136k original miles (logged thanks to California's
emissions testing) and was in overall decent condition but with many of
the expected issues of a truck of this age; cracking vacuum lines, worn
gear synchronizers, electronic issues, fragile plastics, and more.

My goal is to drive this truck as a daily driver, address and improve
existing mechanical issues, and eventually restore and upgrade creature
comforts once the core faults are fully addressed.

In this project page I will cover anything interesting I have done. Youtube
has been an incredible reference as was _"Engine Management: Advanced Tuning"_{% cite engMgmtTune %}
which acted as a much needed primer on EFI systems. I consider myself
mechnically inclined but until this book EFI was pure magic.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/truck_1.jpg" title="Old Smokey" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Somehow she drove all 1000 miles from LA to Lafayette CO.
</div>

### Fluid Swap Log

It is difficult to know how recently any of the fluids have been replaced. While the seller claims
it was oil changed regularly that is impossible to verify. During the first half of 2025 I intend to
replace and refresh every possible fluid.

- [x] Oil Change - Dec 2024; receipt shared by seller.
- [x] Engine Coolant - Jan 2024; system drained and refilled.
- [x] Power Steering Fluid - Jan 2024.
- [x] Differential Fluid Front & Rear - Feb 2024; 80w90 gear old.
- [x] Transmission fluid for M5OD - Feb 2024; MERCON V ATF as specified.
- [ ] Brake fluid
- [ ] Transfer case
- [ ] Clutch fluid


### Computer Repair

A common problem on these old trucks is leaking electrolytic capacitors on the EEC-IV control computer.
The electrolyte can leak and is very corrosive; capable of destroying traces on the board. Luckily the
board is very simple in construction with a single layer on each side so a common repair is to pull and
replace these capacitors.

I sourced some aluminum-polymer capacitors from Digikey and did the repair at home. The project took
a little longer than expected due to my first Digikey order being lost in the mail, but even with
the cost of conformal coating and other supplies it was $84.26 which is about 1/5 the cost of a
reman ECU.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/truck/board_annotated.jpg" title="ECU Annotated" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/truck/board_contacts.jpg" title="Close up" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/truck/board_label.jpg" title="ECU Part No." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
