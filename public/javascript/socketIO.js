

const socket = io();

socket.on('newclientconnect', function(data){
    document.querySelector('#disconect').textContent = `${data.description} `;
 });