// DOM Elements
const header = document.getElementById("header")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")
const backToTopBtn = document.getElementById("backToTop")
const contactForm = document.getElementById("contactForm")

const testimonialsContainer = document.getElementById("testimonialsContainer")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const testimonialsDots = document.getElementById("testimonialsDots")

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("open")
  mobileNav.classList.toggle("open")
})

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-link-mobile").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("open")
    mobileNav.classList.remove("open")
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Back to top button
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show")
  } else {
    backToTopBtn.classList.remove("show")
  }
})

// Smooth scroll function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
    // Close mobile menu if open
    mobileMenuBtn.classList.remove("open")
    mobileNav.classList.remove("open")
  }
}

// Back to top functionality
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

// FAQ Accordion functionality
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const isExpanded = question.getAttribute("aria-expanded") === "true"
      const answer = question.nextElementSibling

      // Close all other FAQ items
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute("aria-expanded", "false")
          const otherAnswer = otherQuestion.nextElementSibling
          otherAnswer.setAttribute("aria-hidden", "true")
        }
      })

      // Toggle current FAQ item
      if (isExpanded) {
        question.setAttribute("aria-expanded", "false")
        answer.setAttribute("aria-hidden", "true")
      } else {
        question.setAttribute("aria-expanded", "true")
        answer.setAttribute("aria-hidden", "false")
      }
    })
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Special handling for stats animation
      // if (entry.target.classList.contains("proof-section")) {
      //   animateCounters()
      // }

      // Special handling for FAQ items animation
      if (entry.target.classList.contains("faq-section")) {
        const faqItems = entry.target.querySelectorAll(".faq-item")
        const faqCta = entry.target.querySelector(".faq-cta")

        faqItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate")
          }, index * 100)
        })

        // Animate CTA after all FAQ items
        if (faqCta) {
          setTimeout(
            () => {
              faqCta.classList.add("animate")
            },
            faqItems.length * 100 + 200,
          )
        }
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(
    ".section-header, .testimonial-card, .process-card, .service-card, .time-text, .time-visual, .contact-form-card, .contact-info, .cta-header, .proof-section, .faq-section",
  )
  .forEach((el) => {
    observer.observe(el)
  })



function animateCounter(element, start, end, suffix, duration) {
  const range = end - start
  const increment = range / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= end) {
      current = end
      clearInterval(timer)
    }

    if (suffix === "X") {
      element.textContent = current.toFixed(1) + suffix
    } else {
      element.textContent = Math.floor(current) + suffix
    }
  }, 16)
}


// Add click handlers for navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add initial animation to hero content
  setTimeout(() => {
    document.querySelector(".hero-content").style.opacity = "1"
    document.querySelector(".hero-content").style.transform = "translateY(0)"
  }, 500)

  initTestimonialCarousel()
  initFAQAccordion()
})

window.addEventListener("resize", () => {
  updateCarousel()
})
