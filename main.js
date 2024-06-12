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
