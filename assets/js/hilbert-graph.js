class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `Point{${this.x},${this.y}}`;
  }
}

class SubCurvePointRef {
    constructor(point, subcurve) {
        this.point = point;
        this.subcurve = subcurve;
    }
}

class Subcurve {
  constructor(type, order = 1, debug = false, position = 0, parent = null, ) {
    this.type = type; // 'A', 'B', 'C', or 'D'
    this.debug = debug;
    this.position = position;
    this.parent = parent;
    this.populateSubcurves(order);
    this.boundaryIntervals(type);
    //console.log("Subcurve " + type + " created with order " + order + " and debug " + debug);

    // Attributes to track relationships between subcurves and critical points that
    // will be used when redrawing curves.
    this.pointUL = null;
    this.pointLR = null;
    this.firstPoint = null;
    this.lastPoint = null;
    this.priorSubcurve = null;
    this.nextSubcurve = null;
  }

  // Populate the subcurves for a given order.
  // A -> D,A,A,B
  // B -> C,B,B,A
  // C -> B,C,C,D
  // D -> A,D,D,C
  populateSubcurves(order) {
    this.points = [null, null, null, null];
    if (order == 1) {
      this.subs = [null, null, null, null];
      return;
    }
    const ord = order - 1;
    if (this.type == 'A') {
      this.subs = [new Subcurve('D', ord, this.debug, 0, this), new Subcurve('A', ord, this.debug, 1, this), new Subcurve('A', ord, this.debug, 2, this), new Subcurve('B', ord, this.debug, 3, this)];
    } else if (this.type == 'B') {
      this.subs = [new Subcurve('C', ord, this.debug, 0, this), new Subcurve('B', ord, this.debug, 1, this), new Subcurve('B', ord, this.debug, 2, this), new Subcurve('A', ord, this.debug, 3, this)];
    } else if (this.type == 'C') {
      this.subs = [new Subcurve('B', ord, this.debug, 0, this), new Subcurve('C', ord, this.debug, 1, this), new Subcurve('C', ord, this.debug, 2, this), new Subcurve('D', ord, this.debug, 3, this)];
    } else if (this.type == 'D') {
      this.subs = [new Subcurve('A', ord, this.debug, 0, this), new Subcurve('D', ord, this.debug, 1, this), new Subcurve('D', ord, this.debug, 2, this), new Subcurve('C', ord, this.debug, 3, this)];
    }
  }

  shiftLeftPoint() {
    var input_point = this.position;
    if (this.parent == null) {
        return null
    }
    if (input_point > 0 ) {
        var pt = this.parent.points[input_point-1];
        if (pt) {
            //console.log("pt: " + pt);
            return pt
        }
        var lp = this.parent.subs[input_point-1].lastPoint
        if (lp) {
            //console.log("lp: " + lp);
            return lp
        }
    }
    if (input_point == 0) {
        return this.parent.shiftLeftPoint()
    }
  }

  shiftRightPoint() {
    var input_point = this.position;
    if (this.parent == null) {
        return null
    }
    if (input_point < 3 ) {
        var lp = this.parent.points[input_point+1];
        if (lp) {
            return lp
        }
        var fp = this.parent.subs[input_point+1].firstPoint
        if (fp) {
            return fp
        }
    }
    if (input_point == 3) {
        return this.parent.shiftRightPoint()
    }
  }

  shiftRightCurve() {
    var input_position = this.position;
    if (this.parent == null) {
        return null
    }
    if (input_position < 3) {
        var fp = this.parent.subs[input_position+1]
        if (fp) {
            return fp
        }
    }
    if (input_position == 3) {
        return this.parent.shiftRightCurve()
    }
  }


  // Get the subcurve at a given position.
  // Used by the constructor to set the order in which the subcurves are drawn.
  // Drawing order
  // A: BL, TL, TR, BR
  // B: TR, TL, BL, BR
  // C: TR, BR, BL, TL
  // D: BL, BR, TR, TL
  boundaryIntervals(type) {
    if (type == 'A') {
        // Draw order BL, TL, TR, BR
        this.xBounds = [[0, 1], [0, 1], [1, 2], [1, 2]]
        this.yBounds = [[1, 2], [0, 1], [0, 1], [1, 2]]
    } else if (type == 'B') {
        // Draw order TR, TL, BL, BR
        this.xBounds = [[1, 2], [0, 1], [0, 1], [1, 2]]
        this.yBounds = [[0, 1], [0, 1], [1, 2], [1, 2]]
    } else if (type == 'C') {
        // Draw order TR, BR, BL, TL    
        this.xBounds = [[1, 2], [1, 2], [0, 1], [0, 1]] 
        this.yBounds = [[0, 1], [1, 2], [1, 2], [0, 1]]
    } else if (type == 'D') {
        // Draw order BL, BR, TR, TL
        this.xBounds = [[0, 1], [1, 2], [1, 2], [0, 1]]
        this.yBounds = [[1, 2], [1, 2], [0, 1], [0, 1]]
    } else {
        // throw an error
        throw new Error('Invalid type');
    }
  }
  
  // Get corner coordinates for a given vertex number.
  getBoundingCorners(vertex_number, point_UL, point_LR) {    // Get coordinates of the corners.
    const xleft = point_UL.x;
    const xright = point_LR.x;
    const xm = (xleft + xright) / 2;
    const xall = [xleft, xm, xright];
   
    const yup = point_UL.y;
    const ydown = point_LR.y;
    const ym = (yup + ydown) / 2;
    const yall = [yup, ym, ydown];

    // Corners
    const TL = new Point(
        xall[this.xBounds[vertex_number][0]],
        yall[this.yBounds[vertex_number][0]]
    )
    const BR = new Point(
        xall[this.xBounds[vertex_number][1]],
        yall[this.yBounds[vertex_number][1]]
    )
    return [TL, BR];
  }

  draw(ctx, point_UL, point_LR, prior_point = null) {
    // Returns the last point drawn.
    var current_point = prior_point; // Use the passed in prior_point.
    var fp = null; //tracker for first point
    this.pointUL = point_UL;
    this.pointLR = point_LR;
    for (let i = 0; i < 4; i++) {
        const corners = this.getBoundingCorners(i, point_UL, point_LR);
        if (this.subs[i]) {
            current_point = this.subs[i].draw(ctx, corners[0], corners[1], current_point);
            fp = this.subs[i].firstPoint;
        } else {
            current_point = this.drawSelfCurve(ctx, i, this.subs[i], corners[0], corners[1], current_point);
            fp = current_point;
        }
        if (this.firstPoint == null) {
            this.firstPoint = fp;
        }
    }
    this.lastPoint = current_point;

    // If all the subcurves are null, draw a point at the center
    if (this.subs.every(sub => sub === null)) {
        const xmid = (point_UL.x + point_LR.x)/2;
        const ymid = (point_UL.y + point_LR.y)/2;
        // Add point ref to global hilbertPoints collection
        hilbertPoints.push(new SubCurvePointRef(new Point(xmid, ymid), this));
    }
    
    return current_point;
  }

  drawSelfCurve(ctx, current_num, subcurve, point_UL, point_LR, prior_point) {
    // Get the four vertices for this subcurve type
    let current_point = prior_point;
    // No subcurve, so this is a vertex: draw a line from prior_point to this vertex
    var xmid = (point_UL.x + point_LR.x)/2;
    var ymid = (point_UL.y + point_LR.y)/2;
    this.points[current_num] = new Point(xmid, ymid)

    // if debug is true, draw a red dot at the prior point
    if (this.debug && prior_point) {
        ctx.beginPath();
        ctx.arc(prior_point.x, prior_point.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
    
    if (prior_point) {
        ctx.beginPath();
        ctx.moveTo(prior_point.x, prior_point.y);
        ctx.lineTo(xmid, ymid);
        ctx.strokeStyle = '#0074D9';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
    }
    // Create a point with subcurve info and add it to our collection
    return this.points[current_num];
  }

  undraw(ctx) {
    // Remove this subcurve's point from hilbertPoints (the invisible dot)
    for (let i = hilbertPoints.length - 1; i >= 0; i--) {
      if (hilbertPoints[i].subcurve === this) {
        hilbertPoints.splice(i, 1);
      }
    }
    // If this is a higher-order curve with subcurves, undraw each subcurve
    for (let i = 0; i < 4; i++) {
      if (this.subs[i]) {
        this.subs[i].undraw(ctx);
      } else if (this.points[i]) {
        // For leaf subcurves with direct points, undraw the connecting lines
        const currentPoint = this.points[i];
        
        // Find prior point to erase the incoming line
        let priorPoint = null;
        if (i > 0) {
          // If not the first point, get the previous point in this subcurve
          priorPoint = this.points[i-1];
        } else {
          // If it's the first point, find the connecting point from the left
          // Now the subcurve knows its own position, so no need to pass i
          priorPoint = this.shiftLeftPoint();
          
          // DEBUG: Draw a red dot at the inbound point if the point is set and debug is true
          if (priorPoint && this.debug) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(priorPoint.x, priorPoint.y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.restore();
          }
        }
        
        // If we have a prior point, erase the line
        if (priorPoint) {
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.moveTo(priorPoint.x, priorPoint.y);
          ctx.lineTo(currentPoint.x, currentPoint.y);
          ctx.lineWidth = 5; // Slightly wider to ensure full erasure
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.restore();
        }
        
        // Also erase connections to the next subcurve if this is the last point (i == 3)
        if (i === 3) {
          // Now the subcurve knows its own position, so no need to pass i
          const nextPoint = this.shiftRightPoint();
          
          // DEBUG: Draw a red dot at the outbound point if the point is set and debug is true.
          if (nextPoint && this.debug) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(nextPoint.x, nextPoint.y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.restore();
          }
          // Overdraw a line to erase the prior connecting line if the point is set.
          if (nextPoint) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.moveTo(currentPoint.x, currentPoint.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.lineWidth = 5; // Slightly wider to ensure full erasure
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }
    
    // Also handle the connections when this is a higher-order curve
    // Erase the connection to the prior subcurve
    if (this.firstPoint) {
      // Now the subcurve knows its own position, so no need to pass 0
      const priorPoint = this.shiftLeftPoint();
      
      // DEBUG: Draw a red dot at the inbound point for higher-order curve
      if (priorPoint && this.debug) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(priorPoint.x, priorPoint.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.restore();
      }
      
      if (priorPoint) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.moveTo(priorPoint.x, priorPoint.y);
        ctx.lineTo(this.firstPoint.x, this.firstPoint.y);
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }
    }
    
    // Erase the connection to the next subcurve
    if (this.lastPoint) {
      // Now the subcurve knows its own position, so no need to pass 3
      const nextPoint = this.shiftRightPoint();
      
      // DEBUG: Draw a red dot at the outbound point for higher-order curve
      if (nextPoint && this.debug) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(nextPoint.x, nextPoint.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.restore();
      }
      
      if (nextPoint) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }
    }
    
    // Do NOT clear this.firstPoint or this.lastPoint here!
  }
}

// Global collection to store all points
let hilbertPoints = [];
let highlightedPoint = null;
let canvas, ctx;

function createHilbertCurve(order) {
  // Clear points collection when creating a new curve
  hilbertPoints = [];
  return new Subcurve('A', order, false);
}

function findClosestPoint(mouseX, mouseY) {
  if (hilbertPoints.length === 0) return null;
  
  let closestPoint = null;
  let minDistance = Infinity;
  
  for (const hp of hilbertPoints) {
    const distance = Math.sqrt(Math.pow(mouseX - hp.point.x, 2) + Math.pow(mouseY - hp.point.y, 2));
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = hp;
    }
  }
  
  // Only highlight if mouse is within 15 pixels of a point
  return minDistance <= 30 ? closestPoint : null;
}

document.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('hilbert-canvas');
  ctx = canvas.getContext('2d');
  
  // Base image data for fast redrawing
  let baseImageData = null;
  
  const orderSelect = document.getElementById('order-select');

  function drawHilbert(order) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const curve = createHilbertCurve(order);
    if (curve) {
      // Use a margin so the curve doesn't touch the canvas edge
      const margin = 40;
      const point_UL = new Point(margin, margin);
      const point_LR = new Point(canvas.width - margin, canvas.height - margin);
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      curve.draw(ctx, point_UL, point_LR, null);
      ctx.restore();
      
      // Store the base image data after drawing the curve
      baseImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  function drawHighlightedPoint() {
    // Restore the base image (without highlights)
    if (baseImageData) {
      ctx.putImageData(baseImageData, 0, 0);
    }
    
    if (!highlightedPoint) return;
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(highlightedPoint.point.x, highlightedPoint.point.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();
    
    // Display info about the point
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    //ctx.fillText(
    //  `Type: ${highlightedPoint.subcurve.type}`, 
    //  highlightedPoint.point.x, 
    //  highlightedPoint.point.y - 15
    //);
    ctx.restore();
  }

  // Mouse move event to detect hover
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const newHighlightedPoint = findClosestPoint(mouseX, mouseY);
    
    if (newHighlightedPoint !== highlightedPoint) {
      highlightedPoint = newHighlightedPoint;
      drawHighlightedPoint();
    }
  });
  
  // Add click event to undraw the subcurve when clicking on a highlighted point
  canvas.addEventListener('click', (event) => {
    if (highlightedPoint) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      // Calculate distance to highlighted point
      const distance = Math.sqrt(
        Math.pow(mouseX - highlightedPoint.point.x, 2) + 
        Math.pow(mouseY - highlightedPoint.point.y, 2)
      );
      
      // If clicked close to the highlighted point, undraw its subcurve
      if (distance <= 15) {
        // Undraw the subcurve
        var subcurve = highlightedPoint.subcurve;
        //console.log("subcurve: " + subcurve);
        var inboundPoint = subcurve.shiftLeftPoint()
        //console.log("inboundPoint: " + inboundPoint);
        // Clear the highlight before undrawing/redrawing
        highlightedPoint = null;
        drawHighlightedPoint();
        subcurve.undraw(ctx);
        //subcurve.debug = true;
        subcurve.populateSubcurves(2);
        subcurve.draw(ctx, subcurve.pointUL, subcurve.pointLR, inboundPoint);
        var nextcurve = subcurve.shiftRightCurve();
        nextcurve.draw(ctx, nextcurve.pointUL, nextcurve.pointLR, subcurve.lastPoint);
        
        // Redraw the base curve without this subcurve
        baseImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // No need to clear the highlight again here
      }
    }
  });
  
  // Also clear highlight when mouse leaves canvas
  canvas.addEventListener('mouseleave', () => {
    highlightedPoint = null;
    drawHighlightedPoint();
  });

  orderSelect.addEventListener('change', () => {
    drawHilbert(Number(orderSelect.value));
    // Clear any highlighting when changing order
    highlightedPoint = null;
  });

  // Initial draw
  drawHilbert(Number(orderSelect.value));
}); 