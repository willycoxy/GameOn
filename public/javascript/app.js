


 function loginFormHandler1(event) {
    event.preventDefault();
  
   
   // var liveDate = `Posted on ${day}  ${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    //var liveTime = `Time: ${d.getHours()}h:  ${ d.getMinutes()}min: ${ d.getSeconds()}sec`;
  
    const message = document.querySelector('#message1').value.trim();

    


    /*
    socket.emit('livechat', {message: message});

    var el10 = document.createElement('li');
    el10.innerHTML = message.message;
    document.querySelector('#ul1').appendChild(el10);
*/

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
    el1.innerHTML = `By User ID: #${socket.id} `;
    document.querySelector('#ul1').appendChild(el1);
    
    var el5 = document.createElement('li');
    el5.innerHTML = `Connection Status: ${socket.connected} `;
    document.querySelector('#ul1').appendChild(el5);

    /*
    var el6 = document.createElement('li');
    el6.innerHTML = `Manager engine ID: #${socket.io.engine.id} `;
    document.querySelector('#ul1').appendChild(el6);
*/


    socket.on('newclientconnect',function(data){
        var el7 = document.createElement('li');
    el7.innerHTML = `${data.description} `;
    
    document.querySelector('#ul20').appendChild(el7);
});

socket.on('livechat',function(data){
  
    var el8 = document.createElement('li');
   // socket.sockets.emit('livechat',data);
el8.innerHTML = `${data} `;
 //io.sockets.emit('livechat', data);
document.querySelector('#ul1').appendChild(el8);
});
 
    var el = document.createElement('li');
    el.innerHTML = `Message written: ${message}`;
    document.querySelector('#ul1').appendChild(el);



    var el30 = document.createElement('div');
    el30.classList.add('message');
    document.querySelector('#ul1').appendChild(el30);


   socket.emit('livechat', `\n${`Posted on ${day}  ${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`}`);
   socket.emit('livechat', `\n${`Time: ${d.getHours()}h:  ${ d.getMinutes()}min: ${ d.getSeconds()}sec`}`);

    socket.emit('livechat', `\nBy User ID# ${socket.id}`);
    socket.emit('livechat', `Say: ${message}`);

    var el31 = document.createElement('div');
    el31.classList.add('message');
    document.querySelector('#ul1').appendChild(el31);
    

    //clear the input message from live chat
    document.querySelector('#message1').value = "";
    }
  
    
    
  document.querySelector('.login-form1').addEventListener('submit', loginFormHandler1);

















