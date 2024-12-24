var Yes = document.getElementById('Yes')
var No = document.getElementById('No')




document.getElementById('StartBNT').addEventListener('click', (e)=>{
    document.getElementById('FirstDiv').style.display = "none"
    document.getElementById('FavSuit').style.display = ""
    
})
function onSuit(){
    document.getElementById('FavSuit').style.display = "none"
    document.getElementById('FavDress').style.display = ""
}
function onDress(){
    document.getElementById('FavDress').style.display = "none"
    document.getElementById('FavCake').style.display = ""
}
function onCake(){

    document.getElementById('FavCake').style.display = "none"
    document.getElementById('SecondDiv').style.display = ""
    setTimeout(
        function() {
          if(document.getElementById("drawing_canvas").style.display === "none"){
            alert("Nahhhhhhhhhh")
          }
    }, 7500);
    setTimeout(
        function() {
          if(document.getElementById("drawing_canvas").style.display === "none"){
            alert("Ainnoway you actually doing this right now")
          }
    }, 12500);
    setTimeout(
        function() {
          if(document.getElementById("drawing_canvas").style.display === "none"){
            alert("Nah ainnoway you dont want her?")
          }
    }, 17500);

}

/* 

document.getElementById('FirstDiv').style.display = "none"
    document.getElementById('SecondDiv').style.display = ""
    setTimeout(
        function() {
          if(document.getElementById("drawing_canvas").style.display === "none"){
            alert("Nahhhhhhhhhh")
          }
    }, 7500);
    setTimeout(
        function() {
          if(document.getElementById("drawing_canvas").style.display === "none"){
            alert("Ainnoway you actually doing this right now")
          }
    }, 12500);
    setTimeout(
        function() {
          if(document.getElementById("drawing_canvas").style.display === "none"){
            alert("Nah ainnoway you dont want her?")
          }
    }, 17500);



*/
















Yes.addEventListener('click', function(){
    
    document.getElementById('YESSS').style.display = ""
    document.getElementById("drawing_canvas").style.display = ""
    initDrawingCanvas();
    requestAnimationFrame(loop);
    document.getElementById('Yes').style.display = "none"
    document.getElementById('No').style.display = "none"
})







No.onmouseenter = function(){
    //generate a number between 0 and height, and zero and width
    
    var pageWidth = document.documentElement.scrollWidth-200;
    var pageHeight = document.documentElement.scrollHeight-200;



    //random height and width

    var randomY = Math.floor(Math.random() * pageHeight);
    var randomX = Math.floor(Math.random() * pageWidth);

   
    No.style.top =  randomY  + "px"
    No.style.left = randomX + "px"
    

    console.log(RHeight, RWidth)
    console.log(No.style.left, No.style.top)
}



//celebration


const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;

// canvas settings
var viewWidth = document.documentElement.scrollWidth,
    viewHeight = document.documentElement.scrollHeight,
    drawingCanvas = document.getElementById("drawing_canvas"),
    ctx,
    timeStep = (1 / 60);

Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Particle = function (p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = '#' + Math.floor((Math.random() * 0xffffff)).toString(16);

    this.w = 8;
    this.h = 6;

    this.complete = false;
};

Particle.prototype = {
    update: function () {
        this.time = Math.min(this.duration, this.time + timeStep);

        var f = Ease.outCubic(this.time, 0, 1, this.duration);
        var p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

        var dx = p.x - this.x;
        var dy = p.y - this.y;

        this.r = Math.atan2(dy, dx) + HALF_PI;
        this.sy = Math.sin(Math.PI * f * 10);
        this.x = p.x;
        this.y = p.y;

        this.complete = this.time === this.duration;
    },
    draw: function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.r);
        ctx.scale(1, this.sy);

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w * 0.5, -this.h * 0.5, this.w, this.h);

        ctx.restore();
    }
};

var particles = [],
    phase = 2; // Start directly with the particles phase

function initDrawingCanvas() {
    drawingCanvas.width = viewWidth;
    drawingCanvas.height = viewHeight;
    ctx = drawingCanvas.getContext('2d');

    createParticles();
}

function createParticles() {
    for (var i = 0; i < 900; i++) {
        var p0 = new Point(viewWidth * 0.5, viewHeight * 0.5);
        var p1 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p2 = new Point(Math.random() * viewWidth, Math.random() * viewHeight);
        var p3 = new Point(Math.random() * viewWidth, viewHeight + 64);

        particles.push(new Particle(p0, p1, p2, p3));
    }
}

function update() {
    particles.forEach(function (p) {
        p.update();
    });
}

function draw() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    particles.forEach(function (p) {
        p.draw();
    });
}

function loop() {
    update();
    draw();

    if (checkParticlesComplete()) {
        // reset particles
        particles.length = 0;
        createParticles();
    }

    requestAnimationFrame(loop);
}

function checkParticlesComplete() {
    for (var i = 0; i < particles.length; i++) {
        if (particles[i].complete === false) return false;
    }
    return true;
}

// math and easing functions
var Ease = {
    inCubic: function (t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    },
    outCubic: function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    },
    inOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
};

function cubeBezier(p0, c0, c1, p1, t) {
    var p = new Point();
    var nt = (1 - t);

    p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
    p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

    return p;
}