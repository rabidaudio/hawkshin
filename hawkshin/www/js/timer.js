var timeIntoPage = 0.0;
var desiredTimeForPage = 15.0;
var fps = 30;
var shouldDraw = true;

function sketchProc(processing) {
    processing.setup = function() {
        p = processing;
        p.size(100, 100);
        p.background(0, 0);
        p.frameRate(fps);
        p.smooth();
        p.fill(0, 0, 0);
        p.stroke(0, 0, 0);
        p.ellipse(50.0, 50.0, 50.0, 50.0)
    }

    processing.draw = function() {
        if (shouldDraw) {
            timeIntoPage += 1.0 / fps;
            p.fill(255, 255, 255);
            p.strokeWeight(0);
            p.arc(50.0, 50.0, 49.0, 49.0, -Math.PI/2, -Math.PI/2 + timeIntoPage*2*Math.PI / desiredTimeForPage);
            if (timeIntoPage > desiredTimeForPage) {
                $.event.trigger({
                                type: "timeIsUp"
                                });
                shouldDraw = false;
            }
        }
    }
}