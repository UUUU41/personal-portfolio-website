// ===== Chandan Yadav — Portfolio interactions =====

// 1) Typing animation in the hero
const roles = ["Frontend Developer", "AI Prompt Engineer", "BCA Student", "AI Web Developer"];
const typedEl = document.getElementById("typedText");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  typedEl.textContent = word.slice(0, charIndex);
  if (!deleting) {
    if (charIndex < word.length) {
      charIndex++;
      setTimeout(typeLoop, 85);
    } else {
      deleting = true;
      setTimeout(typeLoop, 1500);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeLoop, 40);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 300);
    }
  }
}
typeLoop();

// 2) Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// 3) Reveal sections on scroll + animate skill bars when visible
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".skill-fill").forEach(fill => {
        fill.style.width = fill.dataset.level + "%";
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// 4) Contact form — front-end validation with a friendly demo success message
const form = document.getElementById("contactForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const message = document.getElementById("cfMessage").value.trim();
  formSuccess.textContent = "";

  if (name.length < 2) {
    formError.textContent = "Please enter your name.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formError.textContent = "Please enter a valid email address.";
    return;
  }
  if (message.length < 5) {
    formError.textContent = "Please write a slightly longer message.";
    return;
  }
  formError.textContent = "";
  formSuccess.textContent = "✅ Thank you, " + name + "! Your message was noted. (Demo form — for real messages, reach me on GitHub @UUUU41.)";
  form.reset();
});

// 5) Back-to-top button
document.getElementById("topBtn").addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

console.log("Portfolio loaded — built by Chandan Yadav 🌴");
