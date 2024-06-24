document.addEventListener("DOMContentLoaded", function () {
  const particleContainer = document.querySelector(".hero");
  const particleSizeRange = [30, 60];
  const animationDurationRange = [5, 8];
  const maxParticles = 50;
  const particleInterval = 200;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  function createParticle() {
    if (particleContainer.childElementCount >= maxParticles) {
      return;
    }

    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size =
      Math.random() * (particleSizeRange[1] - particleSizeRange[0]) +
      particleSizeRange[0];
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * windowWidth}px`;
    particle.style.top = `${windowHeight}px`;

    const duration =
      Math.random() * (animationDurationRange[1] - animationDurationRange[0]) +
      animationDurationRange[0];
    particle.style.animationDuration = `${duration}s`;

    particleContainer.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  }

  function generateParticles() {
    setInterval(createParticle, particleInterval);
  }

  function adjustParticles() {
    const newWindowWidth = window.innerWidth;
    const newWindowHeight = window.innerHeight;
    const widthRatio = newWindowWidth / windowWidth;
    const heightRatio = newWindowHeight / windowHeight;

    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle) => {
      const left = parseFloat(particle.style.left);
      const top = parseFloat(particle.style.top);

      particle.style.left = `${left * widthRatio}px`;
      particle.style.top = `${top * heightRatio}px`;
    });

    windowWidth = newWindowWidth;
    windowHeight = newWindowHeight;
  }

  window.addEventListener("resize", adjustParticles);

  generateParticles();
});

function typeWriter(text, i, id) {
  if (i < text.length) {
    document.getElementById(id).innerHTML += text.charAt(i);
    i++;
    setTimeout(function () {
      typeWriter(text, i, id);
    }, 150);
  }
}

var text = "Diseñador web";
typeWriter(text, 0, "typing-text");

let angle = 0;
let startX = 0;
let isDragging = false;
let velocity = 0;
let lastX = 0;
let lastTime = 0;
let momentumId;

const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
const rotateAngle = 360 / totalItems;
const translateZDistance = 400;

function updateCarousel() {
  items.forEach((item, index) => {
    const itemAngle = angle + index * rotateAngle;
    item.style.transform = `rotateY(${itemAngle}deg) translateZ(${translateZDistance}px)`;

    const zIndex = Math.cos((itemAngle % 360) * (Math.PI / 180));
    item.style.zIndex = Math.round(zIndex * 100);
  });
}

function animate() {
  if (!isDragging) {
    angle += velocity;
    velocity *= 0.95;
    updateCarousel();
    if (Math.abs(velocity) > 0.01) {
      momentumId = requestAnimationFrame(animate);
    } else {
      snapToNearest();
    }
  }
}

function snapToNearest() {
  const nearestAngle = Math.round(angle / rotateAngle) * rotateAngle;
  const difference = nearestAngle - angle;

  if (Math.abs(difference) > 0.01) {
    velocity = difference / 10;
    angle += velocity;
    updateCarousel();
    requestAnimationFrame(snapToNearest);
  }
}

function startDragging(event) {
  startX = event.clientX || event.touches[0].clientX;
  lastX = startX;
  lastTime = Date.now();
  isDragging = true;
  velocity = 0;
  cancelAnimationFrame(momentumId);
  event.preventDefault();
}

function onMove(event) {
  if (isDragging) {
    const currentX = event.clientX || event.touches[0].clientX;
    const deltaX = currentX - lastX;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;

    velocity = deltaX / deltaTime;

    angle += deltaX / 5;
    lastX = currentX;
    lastTime = currentTime;
    updateCarousel();
  }
}

function stopDragging() {
  if (isDragging) {
    isDragging = false;
    requestAnimationFrame(animate);
  }
}

const carousel = document.querySelector(".carousel");

carousel.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", onMove);
document.addEventListener("mouseup", stopDragging);
carousel.addEventListener("mouseleave", stopDragging);

carousel.addEventListener("touchstart", startDragging);
document.addEventListener("touchmove", onMove);
document.addEventListener("touchend", stopDragging);
carousel.addEventListener("touchcancel", stopDragging);

updateCarousel();
