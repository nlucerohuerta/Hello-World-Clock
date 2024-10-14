let indicators = [];
const numIndicators = 12; //hours
const indicatorRadius = 15;
const topMargin = 30; // distance from top
const maxHeight = 280; // height of bar for entire hour

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100); // color mode so saturation can be easily changed later

  for (let i = 0; i < numIndicators; i++) {
    indicators.push(new HourIndicator(i));
  }
}

function draw() {
  background(9, 5, 97); // pale pink HSB

  // time stuff
  let h = hour() % 12; // standard time + hour
  let m = minute(); //minutes
  let currentHour = h === 0 ? 11 : h - 1;
  let progress = m / 60;

  for (let i = 0; i < numIndicators; i++) {
    indicators[i].update(i === currentHour ? progress : 0);
    indicators[i].display(i === currentHour);
  }
}

class HourIndicator {
  constructor(position) {
    this.position = position;  
    this.height = indicatorRadius * 2;  

    this.x = (width / numIndicators) * (this.position + 0.5);
    this.y = topMargin + indicatorRadius;
  }

  //connect height(minutes) with visual
  update(progress) {
    let targetHeight = indicatorRadius * 2 + progress * (maxHeight - indicatorRadius * 2);
    this.height = lerp(this.height, targetHeight, 0.1);
  }

  //more visuals
  display(isCurrentHour) {
    if (isCurrentHour && this.height > indicatorRadius * 2) {
      //hour that is growing

      //FIX LATER SATURATION/GRADIENT
      let saturation = map(this.height, indicatorRadius * 2, maxHeight, 20, 100);
      fill(10, saturation, 100); //fill color
      noStroke(); // no outline

      // top circle
      ellipse(this.x, this.y, indicatorRadius * 2);

      //bottom circle
      let bottomY = this.y + this.height - indicatorRadius * 2;
      ellipse(this.x, bottomY, indicatorRadius * 2);

      //connecting rectangle
      if (this.height > indicatorRadius * 2) {
        rect(this.x - indicatorRadius, this.y, indicatorRadius * 2, this.height - indicatorRadius * 2);
      }
    } else {
      //other hours that aren't the hour it is
      //color for current hour and others
      fill(isCurrentHour ? color(210, 20, 100) : color(20, 50, 90));
      ellipse(this.x, this.y, indicatorRadius * 2);
    }
  }
}