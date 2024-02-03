const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

var maxRadius = 45;
var minRadius = 5;

var colorArray = ["#7DDF64", "#C0DF85", "#DEB986", "#DB6C79", "#ED4D6E"];

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.shape = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }

    this.shape();
  };
}
var circleArray = [];
var totalballs = 250;

for (let i = 0; i < totalballs; i++) {
  var x = Math.random() * (canvas.width - radius * 2) + radius;
  var y = Math.random() * (canvas.height - radius * 2) + radius;
  var dx = Math.random() * 5;
  var dy = Math.random() * 5;
  var radius = Math.random() * 5 + 1;

  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function init() {
  circleArray = [];
  for (let i = 0; i < totalballs; i++) {
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = Math.random() * 5;
    var dy = Math.random() * 5;
    var radius = Math.random() * 5 + 1;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();

//resize
addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Mobile functionality
canvas.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

canvas.addEventListener("touchend", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});
