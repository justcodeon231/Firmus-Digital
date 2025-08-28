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

let currentSlide = 0
const totalSlides = 3
let autoSlideInterval
let touchStartX = 0
let touchEndX = 0

function initTestimonialCarousel() {
  if (!testimonialsContainer || !prevBtn || !nextBtn || !testimonialsDots) return

  // Set initial state
  updateCarousel()
  startAutoSlide()

  // Previous button
  prevBtn.addEventListener("click", () => {
    stopAutoSlide()
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
    updateCarousel()
    startAutoSlide()
  })

  // Next button
  nextBtn.addEventListener("click", () => {
    stopAutoSlide()
    currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
    updateCarousel()
    startAutoSlide()
  })

  // Dot navigation
  const dots = testimonialsDots.querySelectorAll(".dot")
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide()
      currentSlide = index
      updateCarousel()
      startAutoSlide()
    })
  })

  testimonialsContainer.addEventListener("touchstart", handleTouchStart, { passive: true })
  testimonialsContainer.addEventListener("touchend", handleTouchEnd, { passive: true })

  // Pause auto-slide on hover (desktop) and touch (mobile)
  testimonialsContainer.addEventListener("mouseenter", stopAutoSlide)
  testimonialsContainer.addEventListener("mouseleave", startAutoSlide)
  testimonialsContainer.addEventListener("touchstart", stopAutoSlide)
  testimonialsContainer.addEventListener("touchend", () => {
    setTimeout(startAutoSlide, 1000) // Resume after 1 second
  })

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide()
    } else {
      startAutoSlide()
    }
  })
}

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    stopAutoSlide()
    if (diff > 0) {
      // Swipe left - next slide
      currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
    } else {
      // Swipe right - previous slide
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
    }
    updateCarousel()
    setTimeout(startAutoSlide, 1000) // Resume auto-slide after 1 second
  }
}

function updateCarousel() {
  if (!testimonialsContainer || !testimonialsDots) return

  const isMobile = window.innerWidth <= 768
  let translateX

  if (isMobile) {
    // On mobile, show one full card at a time
    translateX = -currentSlide * 100
  } else {
    // On desktop, maintain the original 3-card layout
    translateX = -currentSlide * (100 / totalSlides)
  }

  testimonialsContainer.style.transform = `translateX(${translateX}%)`

  // Update slide states
  const slides = testimonialsContainer.querySelectorAll(".testimonial-slide")
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide)
  })

  // Update dots
  const dots = testimonialsDots.querySelectorAll(".dot")
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide)
  })
}

function startAutoSlide() {
  stopAutoSlide()
  autoSlideInterval = setInterval(() => {
    currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
    updateCarousel()
  }, 5000) // Change slide every 5 seconds
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

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
      if (entry.target.classList.contains("proof-section")) {
        animateCounters()
      }

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

  initTestimonialCarousel()
  initFAQAccordion()
})

window.addEventListener("resize", () => {
  updateCarousel()
})
