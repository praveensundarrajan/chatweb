const socket = io();

document.getElementById('message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const message = document.getElementById('message').value;

  if (username.trim() === '' || message.trim() === '') {
    alert('Please enter your username and message.');
    return;
  }

  socket.emit('chatMessage', { username, message });
  document.getElementById('message').value = '';
});

socket.on('chatMessage', ({ username, message }) => {
  const chatBox = document.getElementById('chat-box');
  const newMessage = document.createElement('div');
  newMessage.className = 'message';
  newMessage.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
});
