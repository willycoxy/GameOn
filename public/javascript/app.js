
 

 function loginFormHandler1(event) {
    event.preventDefault();
  
    socket.on("welcome1", (data) => {
    
        console.log(`\n***********************************************************************`);
        console.log(`Front-end  client console side using  - Socket Id: ${socket.id} \n ${data} `);
        socket.emit("message",console.log(JSON.stringify({
            type: "hello from client",
            content: [ 3, "4" ]
          })));
    });
    
    const message = document.querySelector('#message1').value.trim();

    var el2 = document.createElement('div');
    el2.classList.add('message');
    document.querySelector('#ul1').appendChild(el2);

/*
    var el3 = document.createElement('li');
    el3.innerHTML =`${ d.getMonth()}`;
    document.querySelector('#ul1').appendChild(el3);
*/

    var el1 = document.createElement('li');
    el1.innerHTML = `Socket ID: #${socket.id} `;
    document.querySelector('#ul1').appendChild(el1);
 
    var el = document.createElement('li');
    el.innerHTML = `Message: ${message}`;
    document.querySelector('#ul1').appendChild(el);

    socket.emit('message21',message);

    }
  
   
    
  document.querySelector('.login-form1').addEventListener('submit', loginFormHandler1);

















