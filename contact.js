/**
 * js/contact.js
 * Contact form validation and Netlify submission handling.
 */

(function () {
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function setError(input, msg) {
    input.classList.add('error');
    const errEl = input.parentElement.querySelector('.form-error, .form-error-msg');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    const errEl = input.parentElement.querySelector('.form-error, .form-error-msg');
    if (errEl) errEl.classList.remove('visible');
  }

  function showStatus(form, type, message) {
    let status = form.querySelector('.form-status');
    if (!status) {
      status = document.createElement('div');
      status.className = 'form-status';
      form.appendChild(status);
    }
    status.className = `form-status ${type}`;
    status.hidden = false;
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = message;
  }

  function setLoading(btn, loading) {
    if (loading) {
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
      btn.disabled = true;
    } else {
      btn.innerHTML = btn.dataset.originalText || 'Send Message';
      btn.disabled = false;
    }
  }

  function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input, .form-textarea');

    // Live validation
    inputs.forEach((input) => {
      input.addEventListener('input', () => clearError(input));
      input.addEventListener('blur', () => {
        if (!input.value.trim() && input.required) {
          setError(input, 'This field is required.');
        } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
          setError(input, 'Please enter a valid email address.');
        } else {
          clearError(input);
        }
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const existingStatus = form.querySelector('.form-status');
      if (existingStatus) { existingStatus.hidden = true; existingStatus.textContent = ''; }

      let valid = true;
      const nameInput    = form.querySelector('#name');
      const emailInput   = form.querySelector('#email');
      const subjectInput = form.querySelector('#subject');
      const messageInput = form.querySelector('#message');
      const submitBtn    = form.querySelector('[type="submit"]');

      // Validate
      if (!nameInput.value.trim()) {
        setError(nameInput, 'Please enter your name.');
        valid = false;
      } else {
        clearError(nameInput);
      }

      if (!emailInput.value.trim()) {
        setError(emailInput, 'Please enter your email address.');
        valid = false;
      } else if (!validateEmail(emailInput.value)) {
        setError(emailInput, 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(emailInput);
      }

      if (!subjectInput.value.trim()) {
        setError(subjectInput, 'Please enter a subject.');
        valid = false;
      } else {
        clearError(subjectInput);
      }

      if (!messageInput.value.trim()) {
        setError(messageInput, 'Please enter your message.');
        valid = false;
      } else if (messageInput.value.trim().length < 10) {
        setError(messageInput, 'Please write a bit more — at least 10 characters.');
        valid = false;
      } else {
        clearError(messageInput);
      }

      if (!valid) return;

      setLoading(submitBtn, true);

      try {
        const formData = new FormData(form);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
         showStatus(form, 'success', "✓ Message sent. I'll get back to you soon.");
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        showStatus(
          form,
          'error',
          'Something went wrong. Please try again later or use another available contact method.'
        );
      } finally {
        setLoading(submitBtn, false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();