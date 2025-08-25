// DOM Elements
const header = document.getElementById("header")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")
const backToTopBtn = document.getElementById("backToTop")
const contactForm = document.getElementById("contactForm")

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
      if (entry.target.classList.contains("proof-section")) {
        animateCounters()
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(
    ".section-header, .testimonial-card, .process-card, .service-card, .time-text, .time-visual, .contact-form-card, .contact-info, .cta-header, .proof-section",
  )
  .forEach((el) => {
    observer.observe(el)
  })

// Counter Animation
let countersAnimated = false

function animateCounters() {
  if (countersAnimated) return
  countersAnimated = true

  const laborStat = document.getElementById("laborStat")
  const turnaroundStat = document.getElementById("turnaroundStat")
  const productivityStat = document.getElementById("productivityStat")

  // Animate stats
  animateCounter(laborStat, 0, 60, "%", 2000)
  animateCounter(turnaroundStat, 0, 50, "%", 2000)
  animateCounter(productivityStat, 0, 2, "X", 2000)

  // Add animation class to stat items
  document.querySelectorAll(".stat-item").forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate")
    }, index * 200)
  })
}

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

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  // Here you would typically send the data to your server
  console.log("Form submitted:", data)

  // Show success message
  alert("Thank you for your message! We'll get back to you soon.")

  // Reset form
  contactForm.reset()
})

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
})
