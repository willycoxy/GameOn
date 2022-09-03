async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login1').value.trim();
    const password = document.querySelector('#password-login1').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }


  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);