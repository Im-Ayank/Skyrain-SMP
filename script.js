// Initialize AOS (Animate On Scroll)
window.AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Copy server IP functionality
function copyIP() {
  const serverIP = document.getElementById("serverIP").textContent
  navigator.clipboard
    .writeText(serverIP)
    .then(() => {
      // Show success feedback
      const button = document.querySelector(".btn-copy")
      const originalHTML = button.innerHTML
      button.innerHTML = '<i class="fas fa-check"></i>'
      button.style.background = "linear-gradient(135deg, #00ff88, #00d4ff)"

      setTimeout(() => {
        button.innerHTML = originalHTML
        button.style.background = "linear-gradient(135deg, #00ff88, #00d4ff)"
      }, 2000)

      // Show toast notification
      showToast("Server IP copied to clipboard!", "success")
    })
    .catch(() => {
      showToast("Failed to copy IP address", "error")
    })
}

// Toast notification system
function showToast(message, type = "info") {
  // Remove existing toast
  const existingToast = document.querySelector(".toast-notification")
  if (existingToast) {
    existingToast.remove()
  }

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast-notification toast-${type}`
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  // Add toast styles
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "linear-gradient(135deg, #00ff88, #00d4ff)"
            : type === "error"
              ? "linear-gradient(135deg, #ff6b35, #f093fb)"
              : "linear-gradient(135deg, #8b5cf6, #ec4899)"
        };
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `

  document.body.appendChild(toast)

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// Add toast animations to CSS
const toastStyles = document.createElement("style")
toastStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
    }
`
document.head.appendChild(toastStyles)

// Simulate server player count
function updatePlayerCount() {
  const playerCountElement = document.getElementById("playersOnline")
  if (playerCountElement) {
    // Simulate realistic player count between 150-850
    const baseCount = 150
    const variation = Math.floor(Math.random() * 700)
    const playerCount = baseCount + variation

    playerCountElement.textContent = playerCount.toLocaleString()
  }
}

// Update player count every 30 seconds
updatePlayerCount()
setInterval(updatePlayerCount, 30000)

// Purchase rank functionality
function purchaseRank(rankType) {
  const rankPrices = {
    bronze: "$4.99",
    silver: "$9.99",
    gold: "$19.99",
    diamond: "$39.99",
  }

  const rankName = rankType.charAt(0).toUpperCase() + rankType.slice(1)
  const price = rankPrices[rankType]

  // Show confirmation modal (simplified)
  if (confirm(`Are you sure you want to purchase ${rankName} rank for ${price}?`)) {
    // In a real application, this would redirect to a payment processor
    showToast(`Redirecting to payment for ${rankName} rank...`, "info")

    // Simulate redirect delay
    setTimeout(() => {
      showToast("This is a demo - payment integration would go here!", "info")
    }, 2000)
  }
}

// Purchase kit functionality
function purchaseKit(kitType) {
  const kitPrices = {
    warrior: "$2.99",
    builder: "$3.99",
    miner: "$2.49",
  }

  const kitName = kitType.charAt(0).toUpperCase() + kitType.slice(1)
  const price = kitPrices[kitType]

  // Show confirmation modal (simplified)
  if (confirm(`Are you sure you want to purchase ${kitName} kit for ${price}?`)) {
    // In a real application, this would redirect to a payment processor
    showToast(`Redirecting to payment for ${kitName} kit...`, "info")

    // Simulate redirect delay
    setTimeout(() => {
      showToast("This is a demo - payment integration would go here!", "info")
    }, 2000)
  }
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".custom-navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  const heroImage = document.querySelector(".hero-image")

  if (heroContent && heroImage) {
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`
    heroImage.style.transform = `translateY(${scrolled * 0.15}px)`
  }
})

// Add loading state to buttons
document.querySelectorAll(".btn-rank, .btn-kit").forEach((button) => {
  button.addEventListener("click", function () {
    const originalText = this.innerHTML
    this.innerHTML = '<span class="loading"></span> Processing...'
    this.disabled = true

    setTimeout(() => {
      this.innerHTML = originalText
      this.disabled = false
    }, 3000)
  })
})

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add entrance animations to elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  document.querySelectorAll(".feature-card, .rank-card, .kit-card, .contact-card, .info-card").forEach((el) => {
    observer.observe(el)
  })

  // Add custom cursor effect
  const cursor = document.createElement("div")
  cursor.className = "custom-cursor"
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,255,136,0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `
  document.body.appendChild(cursor)

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"
    cursor.style.display = "block"
  })

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.display = "none"
  })

  console.log("🎮 CraftLegends website loaded successfully!")
  console.log("🚀 All animations and interactions are ready!")
})

// Easter egg - Konami code
let konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // ↑↑↓↓←→←→BA

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (
    konamiCode.length === konamiSequence.length &&
    konamiCode.every((code, index) => code === konamiSequence[index])
  ) {
    // Easter egg activated!
    showToast("🎉 Konami Code activated! You found the secret!", "success")

    // Add special effects
    document.body.style.animation = "rainbow 2s ease infinite"

    setTimeout(() => {
      document.body.style.animation = ""
    }, 5000)

    konamiCode = []
  }
})

// Add rainbow animation for easter egg
const rainbowStyles = document.createElement("style")
rainbowStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`
document.head.appendChild(rainbowStyles)
