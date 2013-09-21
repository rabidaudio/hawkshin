float t = 0.0;
float totalTime = 16.0;
int fr = 32;
color white=#ffffff;
color black=#000000;
boolean shouldDraw=true;

void setup() {
  size(100,100);
  background(0, 0);
  frameRate(fr);
  smooth();
  fill(black);
  stroke(black); ellipse(50.0, 50.0, 50.0, 50.0);
}

void draw() {
  if (shouldDraw) {
    t += 1.0/(fr);
    fill(white);
    strokeWeight(0);
    arc(50.0, 50.0, 49.0, 49.0, -(float)Math.PI/2, -(float)Math.PI/2 + t * 2 * (float)Math.PI / totalTime);
    if (t >= totalTime) {
      $.event.trigger({
        type: "timeIsUp"
      });
      shouldDraw = false;
    }
  }
}
