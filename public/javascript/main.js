
  async function signupFormHandler(event) {
    event.preventDefault();
  

    const message1 = document.querySelector('#fas-fa-paper-plane').value.trim();
  
    if (message1) {
        console.log("message"+ message1);
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify(
          message1
        ),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    }
  }
  

  
  document.querySelector('.chat-form-container').addEventListener('submit', signupFormHandler);


