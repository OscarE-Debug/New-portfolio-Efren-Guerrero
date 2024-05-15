let navigation = document.querySelector(".all-links-nav");
let buttonMobile = document.querySelector(".button-mobile");

window.addEventListener("resize", () => {
  var windowWidth = window.innerWidth;
  if (windowWidth <= 710) {
    navigation.classList.add("mobile");
    buttonMobile.classList.add("active");
  } else {
    navigation.classList.remove("mobile");
    navigation.classList.remove("active");
    buttonMobile.classList.remove("active");
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const particleContainer = document.querySelector('.hero');
  const particleSizeRange = [10, 30];
  const animationDurationRange = [5000, 8000];
  const speed = 10;
  const reductionRate = 0.06;
  const maxParticles = 50;

  let lastGeneratedTime = performance.now();

  function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0];
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${window.innerHeight}px`;
      particleContainer.appendChild(particle);

      const duration = Math.random() * (animationDurationRange[1] - animationDurationRange[0]) + animationDurationRange[0];

      let distance = 0;
      let newSize = size;

      function moveParticle() {
          distance += speed / 60;
          particle.style.top = `${parseInt(particle.style.top) - speed / 60}px`;

          newSize -= reductionRate;
          if (parseInt(particle.style.top) < window.innerHeight / 2) {
              newSize = 1;
          }

          if (parseInt(particle.style.top) < window.innerHeight / 6) {
              particle.remove();
              return;
          }

          if (newSize <= 1) {
              particle.remove();
              return;
          }

          particle.style.width = `${newSize}px`;
          particle.style.height = `${newSize}px`;

          requestAnimationFrame(moveParticle);
      }

      requestAnimationFrame(moveParticle);
  }

  function generateParticles() {
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastGeneratedTime;

      if (elapsedTime > 50 && particleContainer.childElementCount < maxParticles) {
          createParticle();
          lastGeneratedTime = currentTime;
      }

      requestAnimationFrame(generateParticles);
  }

  generateParticles();
});


window.addEventListener("load", () => {
  var windowWidth = window.innerWidth;
  if (windowWidth <= 710) {
    navigation.classList.add("mobile");
    buttonMobile.classList.add("active");
  } else {
    navigation.classList.remove("mobile");
    navigation.classList.remove("active");
    buttonMobile.classList.remove("active");
  }
});

buttonMobile.addEventListener("click", () => {
  if (!navigation.classList.contains("active")) {
    navigation.classList.add("active");
  } else {
    navigation.classList.add("removing-active");
    setTimeout(() => {
      navigation.classList.remove("active");
      navigation.classList.remove("removing-active");
    }, 1000);
  }
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
