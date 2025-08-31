// Modal Management
function showModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden")
  document.body.style.overflow = "auto"
}

function showRoleSelection() {
  showModal("roleModal")
}

function showVolunteerForm() {
  closeModal("roleModal")
  showModal("volunteerModal")
}

function showPerformerForm() {
  closeModal("roleModal")
  showModal("performerModal")
}

function showMemberForm() {
  closeModal("roleModal")
  showModal("memberModal")
}

function showLoginModal() {
  showModal("loginModal")
}

// Form Submissions
document.getElementById("volunteerForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Collect form data
  const formData = new FormData(this)
  const volunteerData = {
    type: "volunteer",
    name: formData.get("name") || this.querySelector('input[type="text"]').value,
    email: this.querySelector('input[type="email"]').value,
    phone: this.querySelector('input[type="tel"]').value,
    skills: Array.from(this.querySelectorAll('input[type="checkbox"]:checked')).map((cb) =>
      cb.parentElement.textContent.trim(),
    ),
    availability: Array.from(this.querySelectorAll('input[type="checkbox"]:checked')).map((cb) =>
      cb.parentElement.textContent.trim(),
    ),
    timestamp: new Date().toISOString(),
  }

  // Store in localStorage (in real app, send to server)
  const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
  registrations.push(volunteerData)
  localStorage.setItem("registrations", JSON.stringify(registrations))

  // Show success message
  closeModal("volunteerModal")
  showModal("successModal")

  // Reset form
  this.reset()

  console.log("Volunteer registered:", volunteerData)
})

document.getElementById("performerForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const performerData = {
    type: "performer",
    name: this.querySelector('input[type="text"]').value,
    stageName: this.querySelectorAll('input[type="text"]')[1].value,
    email: this.querySelector('input[type="email"]').value,
    phone: this.querySelector('input[type="tel"]').value,
    talentType: this.querySelector("select").value,
    description: this.querySelector("textarea").value,
    equipment: Array.from(this.querySelectorAll('input[type="checkbox"]:checked')).map((cb) =>
      cb.parentElement.textContent.trim(),
    ),
    timestamp: new Date().toISOString(),
  }

  const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
  registrations.push(performerData)
  localStorage.setItem("registrations", JSON.stringify(registrations))

  closeModal("performerModal")
  showModal("successModal")
  this.reset()

  console.log("Performer registered:", performerData)
})

document.getElementById("memberForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const memberData = {
    type: "member",
    name: this.querySelector('input[type="text"]').value,
    email: this.querySelector('input[type="email"]').value,
    phone: this.querySelector('input[type="tel"]').value,
    ticketType: this.querySelector('input[name="ticketType"]:checked')?.value,
    paymentMethod: this.querySelector('input[name="paymentMethod"]:checked')?.value,
    timestamp: new Date().toISOString(),
  }

  const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
  registrations.push(memberData)
  localStorage.setItem("registrations", JSON.stringify(registrations))

  closeModal("memberModal")
  showModal("successModal")
  this.reset()

  console.log("Member registered:", memberData)
})

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const email = this.querySelector('input[type="email"]').value
  const password = this.querySelector('input[type="password"]').value
  const role = this.querySelector("select").value

  // Simple demo authentication (in real app, verify with server)
  if (email && password) {
    closeModal("loginModal")

    // Redirect to appropriate dashboard based on role
    switch (role.toLowerCase()) {
      case "admin":
        window.location.href = "admin.html"
        break
      case "volunteer":
        window.location.href = "volunteer-dashboard.html"
        break
      case "performer":
        window.location.href = "performer-dashboard.html"
        break
      case "member":
        window.location.href = "member-dashboard.html"
        break
      default:
        alert("Dashboard coming soon!")
    }
  }
})

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fixed") && e.target.classList.contains("inset-0")) {
    const modals = ["roleModal", "volunteerModal", "performerModal", "memberModal", "loginModal", "successModal"]
    modals.forEach((modalId) => {
      if (!document.getElementById(modalId).classList.contains("hidden")) {
        closeModal(modalId)
      }
    })
  }
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

// Form validation helpers
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ""))
}

// Add real-time validation
document.addEventListener("input", (e) => {
  if (e.target.type === "email") {
    if (e.target.value && !validateEmail(e.target.value)) {
      e.target.style.borderColor = "#ef4444"
    } else {
      e.target.style.borderColor = "#d1d5db"
    }
  }

  if (e.target.type === "tel") {
    if (e.target.value && !validatePhone(e.target.value)) {
      e.target.style.borderColor = "#ef4444"
    } else {
      e.target.style.borderColor = "#d1d5db"
    }
  }
})
