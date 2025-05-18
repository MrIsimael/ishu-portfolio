// <!-- JavaScript for Projects Section -->

  // Function to filter projects by category
function filterProjects(category) {
  // Get all project items
  const projectItems = document.querySelectorAll('.project-item');
  
  // Update active button state
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Find and activate clicked button
  document.querySelector(`.filter-btn[onclick*="${category}"]`).classList.add('active');
  
  // Filter projects based on category
  projectItems.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Function to open project modal
function openProjectModal(imageSrc, title, description, figmaLink = null) {
  // Set the content
  document.getElementById("modalImage").src = imageSrc;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = description;
  
  // Manage Figma link visibility
  const figmaAnchor = document.getElementById("modalLink");
  if (figmaLink) {
    figmaAnchor.href = figmaLink;
    figmaAnchor.style.display = "inline-block";
  } else {
    figmaAnchor.style.display = "none";
  }
  
  // Show Bootstrap modal
  const myModal = new bootstrap.Modal(document.getElementById('projectModal'));
  myModal.show();
}

// Function to open video modal
function openVideoModal(videoSrc, title, description) {
  document.getElementById('videoModalTitle').textContent = title;
  document.getElementById('videoFrame').src = videoSrc;
  document.getElementById('videoModalDescription').textContent = description;
  
  const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
  videoModal.show();
  
  // Handle video cleanup when modal is closed
  document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('videoFrame').src = '';
  });
}

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initially show all projects
  filterProjects('all');
  
  // Fix for Bootstrap 5 modal backdrop issue
  const projectModal = document.getElementById('projectModal');
  projectModal.addEventListener('hidden.bs.modal', function() {
    document.body.classList.remove('modal-open');
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach(backdrop => {
      backdrop.parentNode.removeChild(backdrop);
    });
  });
  
  // Apply the same fix to video modal
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('hidden.bs.modal', function() {
      document.body.classList.remove('modal-open');
      const modalBackdrops = document.querySelectorAll('.modal-backdrop');
      modalBackdrops.forEach(backdrop => {
        backdrop.parentNode.removeChild(backdrop);
      });
      // Stop video playback
      document.getElementById('videoFrame').src = '';
    });
  }
});

// <!-- JavaScript for scroll effect and modal interaction -->

    // Add scrolled class to navbar when scrolling down
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar.fixed-top');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hide navbar when modal opens, show when modal closes
    document.addEventListener('DOMContentLoaded', function() {
        const projectModal = document.getElementById('projectModal');
        const videoModal = document.getElementById('videoModal');
        const navbar = document.querySelector('.navbar.fixed-top');
        
        if (projectModal && navbar) {
            // Hide navbar when modal opens
            projectModal.addEventListener('show.bs.modal', function() {
                navbar.style.display = 'none';
            });
            
            // Show navbar when modal closes
            projectModal.addEventListener('hidden.bs.modal', function() {
                navbar.style.display = '';
            });
        }
        
        if (videoModal && navbar) {
            // Hide navbar when video modal opens
            videoModal.addEventListener('show.bs.modal', function() {
                navbar.style.display = 'none';
            });
            
            // Show navbar when video modal closes
            videoModal.addEventListener('hidden.bs.modal', function() {
                navbar.style.display = '';
            });
        }
    });

    /**
 * Contact form validation script
 * Can be added to the main JavaScript file or used separately
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submitBtn');
  
  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Validate all fields on submit
  contactForm.addEventListener('submit', function(event) {
    let isValid = true;
    
    // Reset validation state
    resetValidation();
    
    // Validate name
    if (!nameInput.value.trim()) {
      isValid = false;
      showError(nameInput, 'Please enter your name');
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
      isValid = false;
      showError(emailInput, 'Please enter your email address');
    } else if (!emailPattern.test(emailInput.value.trim())) {
      isValid = false;
      showError(emailInput, 'Please enter a valid email address');
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
      isValid = false;
      showError(messageInput, 'Please enter your message');
    }
    
    // If not valid, prevent form submission
    if (!isValid) {
      event.preventDefault();
    } else {
      // Show loading state on button
      submitButton.disabled = true;
      
      // Optional: Send form data via AJAX instead of default form submission
      // This allows for more control over the submission process
      /*
      event.preventDefault();
      
      fetch('https://formspree.io/f/meogvqyk', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          // Show success message
          contactForm.innerHTML = '<div class="alert alert-success">Thank you for your message! I\'ll get back to you soon.</div>';
        } else {
          // Show error
          showFormError('There was a problem sending your message. Please try again later.');
          resetSubmitButton();
        }
      })
      .catch(error => {
        showFormError('There was a problem sending your message. Please try again later.');
        resetSubmitButton();
      });
      */
    }
  });
  
  // Live validation for email field
  emailInput.addEventListener('blur', function() {
    if (emailInput.value.trim() && !emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
    } else {
      clearError(emailInput);
    }
  });
  
  // Clear errors when user starts typing
  const inputs = [nameInput, emailInput, messageInput];
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      clearError(input);
    });
  });
  
  // Helper functions
  function showError(input, message) {
    input.classList.add('is-invalid');
    
    // Find or create the error message element
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
      errorElement = document.createElement('div');
      errorElement.className = 'invalid-feedback';
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    
    errorElement.textContent = message;
  }
  
  function clearError(input) {
    input.classList.remove('is-invalid');
  }
  
  function resetValidation() {
    inputs.forEach(input => clearError(input));
  }
  
  function showFormError(message) {
    // Create error alert if it doesn't exist
    let errorAlert = document.querySelector('.form-error-alert');
    if (!errorAlert) {
      errorAlert = document.createElement('div');
      errorAlert.className = 'alert alert-danger form-error-alert';
      contactForm.prepend(errorAlert);
    }
    
    errorAlert.textContent = message;
    errorAlert.style.display = 'block';
  }
  
  function resetSubmitButton() {
    submitButton.innerHTML = 'Send Message';
    submitButton.disabled = false;
  }
});

  document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submitBtn');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;
    resetValidation();

    if (!nameInput.value.trim()) {
      isValid = false;
      showError(nameInput, 'Please provide your name');
    }

    if (!emailInput.value.trim()) {
      isValid = false;
      showError(emailInput, 'Please provide a valid email address');
    } else if (!emailPattern.test(emailInput.value.trim())) {
      isValid = false;
      showError(emailInput, 'Please enter a valid email address');
    }

    if (!messageInput.value.trim()) {
      isValid = false;
      showError(messageInput, 'Please write a message');
    }

    if (!isValid) return;

    submitButton.disabled = true;

    fetch('https://formspree.io/f/meogvqyk', {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          contactForm.reset();
          resetValidation();
          showAlert('✅ Message sent successfully!', 'success');
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        showAlert('❌ Failed to send. Please try again later.', 'danger');
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });

  function showError(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = '';
  }

  function resetValidation() {
    [nameInput, emailInput, messageInput].forEach(clearError);
  }

  function showAlert(message, type) {
    let alertBox = document.querySelector('.form-alert');
    if (!alertBox) {
      alertBox = document.createElement('div');
      alertBox.className = `alert alert-${type} form-alert mt-3`;
      contactForm.appendChild(alertBox);
    }
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} form-alert mt-3`;

    setTimeout(() => {
      alertBox.remove();
    }, 6000);
  }
});

