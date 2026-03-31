/***********
* Nav Bar JS
***********/

const nav = document.getElementById("myTopNav");
const animation = nav.querySelector(".animation");
const links = nav.querySelectorAll("a.nav-link");

links.forEach(link => {
  link.addEventListener("click", function () {

    // remove active from all
    links.forEach(l => l.classList.remove("active"));

    // add to clicked one
    this.classList.add("active");

    // move animation to it
    moveToLink(this);
  });
});

function moveToLink(link) {
  const rect = link.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  animation.style.left = `${rect.left - navRect.left}px`;
  animation.style.width = `${rect.width}px`;
}

// hover behaviour
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    moveToLink(link);
  });
});

// reset to active on mouse leave
nav.addEventListener("mouseleave", () => {
  const currentActive = nav.querySelector("a.active"); // 🔥 dynamic
  if (currentActive) {
    moveToLink(currentActive);
  }
});

window.addEventListener("load", () => {
  const currentActive = nav.querySelector("a.active");
  if (currentActive) {
    moveToLink(currentActive);
  }
});

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.querySelectorAll("#myTopNav a.nav-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = this.getAttribute("href");
    console.log("Scrolling to:", target); // 👈 debug


    gsap.to(window, {
      duration: 1,
      scrollTo: target,
      ease: "power2.out"
    });
  });
});

// gsap.utils.toArray(".fade-in").forEach(element => {
//   gsap.from(element, {
//     opacity: 0,
//     y: 50,
//     duration: 1,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: element,
//       start: "top 80%",   // when element enters viewport
//       toggleActions: "play none none none"
//     }
//   });
// });

window.addEventListener("load", () => {
  gsap.utils.toArray(".fade-in").forEach(element => {
    gsap.from(element, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "top 50%",
        scrub: 1.5
        
      }
    });
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
  } else {
    nav.style.boxShadow = "none";
  }
});

function setActiveLink(sectionId) {

  links.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + sectionId) {
      link.classList.add("active");
      moveToLink(link); // moves the green slider
    }
  });

}

const sections = document.querySelectorAll("section");

sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top 60%",
    end: "bottom center",

    onEnter: () => setActiveLink(section.id),
    onEnterBack: () => setActiveLink(section.id)
  });
});