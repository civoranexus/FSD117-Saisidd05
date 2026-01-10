document.addEventListener("DOMContentLoaded", () => {

    /* ================= SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ================= SCROLL REVEAL ================= */
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* ================= DARK MODE ================= */
    const darkToggle = document.getElementById("darkToggle");
    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            darkToggle.textContent =
                document.body.classList.contains("dark") ? "☀️" : "🌙";
        });
    }

    /* ================= HAMBURGER MENU ================= */
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    /* ================= CONTACT FORM ================= */
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for your message!");
            this.reset();
        });
    }

    /* ================= PROJECT VIEW MORE (ANIMATED DIALOG) ================= */
    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            const projectItem = button.closest(".project-item");
            if (!projectItem) return;

            // Close all other open project dialogs
            document.querySelectorAll(".project-item").forEach(item => {
                if (item !== projectItem) {
                    item.classList.remove("active");
                    const btn = item.querySelector(".view-btn");
                    if (btn) btn.textContent = "View More";
                }
            });

            // Toggle current project
            projectItem.classList.toggle("active");

            // Update button text
            button.textContent =
                projectItem.classList.contains("active")
                    ? "View Less"
                    : "View More";
        });
    });

    /* ================= INITIAL STATE ================= */
    document.querySelectorAll(".project-item").forEach(item => {
        item.classList.remove("active");
    });

});
