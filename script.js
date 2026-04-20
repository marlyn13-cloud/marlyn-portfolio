// Intersection observer for scroll reveals
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--cyan)' : '';
  });
});
function downloadResume() {
  const link = document.createElement("a");
  link.href = "Resume.pdf";
  link.download = "Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function openResume() {
  window.open("Resume.pdf", "_blank", "noopener");
}

function openModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  }
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (modal && e.target === modal) {
    modal.style.display = "none";
  }
});