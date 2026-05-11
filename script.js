const animatedElements = document.querySelectorAll(
  ".section-heading, .value-row article, .statement, .project-card, .skill, .skill-meter, .contact"
);
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");
const deviceCard = document.querySelector(".device-card");
const pageGlow = document.querySelector(".page-glow");
const skills = document.querySelectorAll(".skill[data-level]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

animatedElements.forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});

skills.forEach((skill) => {
  skill.style.setProperty("--level", skill.dataset.level);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isCurrentLink = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrentLink);
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
  }
);

sections.forEach((section) => navObserver.observe(section));

if (deviceCard) {
  deviceCard.addEventListener("mousemove", (event) => {
    const rect = deviceCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    deviceCard.style.setProperty("--tilt-x", `${x * 10}deg`);
    deviceCard.style.setProperty("--tilt-y", `${y * -10}deg`);
  });

  deviceCard.addEventListener("mouseleave", () => {
    deviceCard.style.setProperty("--tilt-x", "0deg");
    deviceCard.style.setProperty("--tilt-y", "0deg");
  });
}

window.addEventListener("mousemove", (event) => {
  if (!pageGlow) {
    return;
  }

  const x = event.clientX - window.innerWidth * 0.18;
  const y = event.clientY - window.innerHeight * 0.82;

  pageGlow.style.setProperty("--glow-x", `${x * 0.08}px`);
  pageGlow.style.setProperty("--glow-y", `${y * 0.08}px`);
});
