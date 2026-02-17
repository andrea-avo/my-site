const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        const time = entry.target.getAttribute("data-time");
        const images = document.querySelectorAll(".bg-container img");
        images.forEach((img) => {
          if (img.id === `img-${time}`) {
            img.classList.add("active");
          } else {
            setTimeout(() => {
              if (!img.classList.contains("active")) img.style.zIndex = -2;
            }, 500);
            img.classList.remove("active");
            img.style.zIndex = -1;
          }
        });

        const sections = ["pagi", "siang", "sore", "malam"];
        const idx = sections.indexOf(time) + 1;
        document.getElementById("progress").style.height =
          (idx / sections.length) * 100 + "%";
      }
    });
  },
  { threshold: 0.6 },
);

document.querySelectorAll("section").forEach((s) => observer.observe(s));
document.getElementById("year").textContent = new Date().getFullYear();
