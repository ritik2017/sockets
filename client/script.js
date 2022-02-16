import { io } from 'socket.io-client';

const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const messageButton = document.getElementById('message-button');
const roomButton = document.getElementById('room-button');
const form = document.getElementById('form');

const socket = io('http://localhost:3000'); // Async Function

socket.on('connect', () => {
    displayMessage(`You are connected to ${socket.id}`);
})

socket.on('receive-message', (message) => {
    displayMessage(message);
})

function displayMessage(message) {

    const messageDiv = document.getElementById('message-container');
    const msDiv = document.createElement('div');
    msDiv.textContent = message;

    messageDiv.append(msDiv);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;

    // Display the message in FE
    displayMessage(message);

    messageInput.value = "";

    const roomId = roomInput.value;

    // Send this message to server via socket
    socket.emit('send-message', message, roomId);
})

roomButton.addEventListener('click', () => {

    const room = roomInput.value;

    socket.emit('join-room', room);

    roomInput.value = "";
})

// client -> request -> processing -> response 

// client -> emits event -> listening receive the data -> emit event from server 