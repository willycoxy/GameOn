
 

 function loginFormHandler1(event) {
    event.preventDefault();
  
    
    
    const message = document.querySelector('#message1').value.trim();

    var el2 = document.createElement('div');
    el2.classList.add('message');
    document.querySelector('#ul1').appendChild(el2);

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let day = days[d.getDay()];
    var el3 = document.createElement('li');
    el3.innerHTML =`Posted on ${day}  ${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    document.querySelector('#ul1').appendChild(el3);


    var el4 = document.createElement('li');
    el4.innerHTML =`Time: ${d.getHours()}h:  ${ d.getMinutes()}min: ${ d.getSeconds()}sec`;
    document.querySelector('#ul1').appendChild(el4);


    var el1 = document.createElement('li');
    el1.innerHTML = `Socket ID: #${socket.id} `;
    document.querySelector('#ul1').appendChild(el1);

    var el5 = document.createElement('li');
    el5.innerHTML = `Connection Status: ${socket.connected} `;
    document.querySelector('#ul1').appendChild(el5);

    var el6 = document.createElement('li');
    el6.innerHTML = `Manager engine ID: #${socket.io.engine.id} `;
    document.querySelector('#ul1').appendChild(el6);



    socket.on('newclientconnect',function(data){
        var el7 = document.createElement('li');
    el7.innerHTML = `${data.description} `;
    
    document.querySelector('#ul20').appendChild(el7);
});
 
    var el = document.createElement('li');
    el.innerHTML = `Message: ${message}`;
    document.querySelector('#ul1').appendChild(el);


    socket.emit('message21',message);

    //clear the input message from live chat
    document.querySelector('#message1').value = "";
    }
  
    
    
  document.querySelector('.login-form1').addEventListener('submit', loginFormHandler1);

















