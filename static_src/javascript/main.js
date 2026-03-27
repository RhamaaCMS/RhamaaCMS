// =============================================================================
// RHAMAA DESIGN SYSTEM - PRELINE V4 INTEGRATION
// =============================================================================
// Minimal JavaScript - Maximum Preline UI
// Updated for Preline v4.0.1

import confetti from "canvas-confetti";

// Preline v4: Import dari preline/dist untuk auto-init semua komponen
import "preline/dist";

document.documentElement.classList.add("js-enabled");

// =============================================================================
// ANIMATION UTILITIES
// =============================================================================

/**
 * Intersection Observer for scroll-triggered animations
 * Adds 'is-visible' class when elements with ' ' enter viewport
 */
const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('. ');

  if (animatedElements.length === 0) return;

  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Default to slide-up if no specific animation class is present
        if (!entry.target.className.match(/animate-(fade|slide|scale|bounce|shake)/)) {
          entry.target.classList.add(' ');
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
};

/**
 * Add shake animation to form fields on validation error
 * Usage: shakeElement(document.querySelector('#email-input'))
 */
const shakeElement = (element) => {
  if (!element) return;

  // Use custom Tailwind shake animation
  element.classList.add('animate-shake');
  element.addEventListener('animationend', () => {
    element.classList.remove('animate-shake');
  }, { once: true });
};

const DEFAULT_CONFETTI_OPTIONS = {
  particleCount: 160,
  spread: 90,
  origin: { y: 0.6 },
};

const parseConfettiOptions = (attrValue) => {
  if (!attrValue) return {};

  try {
    return JSON.parse(attrValue);
  } catch (error) {
    console.warn("[Confetti] Invalid JSON options:", attrValue, error);
    return {};
  }
};

const runConfetti = (options = {}) => {
  const finalOptions = {
    ...DEFAULT_CONFETTI_OPTIONS,
    ...options,
    origin: {
      ...DEFAULT_CONFETTI_OPTIONS.origin,
      ...(options.origin || {}),
    },
  };

  confetti(finalOptions);
};

const initConfettiTriggers = () => {
  const triggers = document.querySelectorAll('[data-hs-confetti-trigger]');

  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    const eventName = trigger.dataset.hsConfettiEvent || 'click';
    const options = parseConfettiOptions(trigger.dataset.hsConfettiOptions);
    const shouldAutoload = trigger.dataset.hsConfettiAutoload === 'true';

    const handler = () => runConfetti(options);
    trigger.addEventListener(eventName, handler);

    if (shouldAutoload) {
      handler();
    }
  });
};

/**
 * Stagger animation for list items
 * Automatically adds stagger classes to children
 */
const initStaggerAnimation = () => {
  const staggerContainers = document.querySelectorAll('[data-stagger]');

  staggerContainers.forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      if (index < 5) {
        child.classList.add(`stagger-${index + 1}`);
      }
    });
  });
};

// Make utilities available globally
window.animationUtils = {
  shakeElement,
  initScrollAnimations,
  initStaggerAnimation,
  runConfetti,
  initConfettiTriggers,
};

// =============================================================================
// PRELINE V4 INITIALIZATION
// =============================================================================

/**
 * Reinitialize Preline components - useful for dynamic content
 * Use: window.reinitPreline() or window.reinitPreline(['collapse', 'dropdown'])
 */
const reinitPreline = (components = null) => {
  if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
    if (components) {
      window.HSStaticMethods.autoInit(components);
    } else {
      window.HSStaticMethods.autoInit();
    }
  }
};

window.reinitPreline = reinitPreline;

// Initialize custom utilities when DOM is ready
const initCustomUtilities = () => {
  initScrollAnimations();
  initStaggerAnimation();
  initConfettiTriggers();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCustomUtilities);
} else {
  initCustomUtilities();
}
