# REAL TIME CODE EDITOR

A collaborative real-time code editor built with React for the frontend, Node.js and Express.js for the backend, and Socket.IO for real-time communication.

# Table of Content

1. Introduction
2. Features
3. Technologies Used
4. Installation
5. Usage
6. Contributing
7. License

# Introduction

The Real-Time Code Editor is a web application that allows multiple users to collaboratively edit code in real time. It leverages WebSocket technology to synchronize edits across all connected clients seamlessly. This tool is ideal for pair programming, team collaboration, and live coding sessions.

# Features

1. Collaborative real-time code editing.
2. Syntax highlighting for multiple programming languages.
3. User presence indicators.
4. Lightweight and responsive design.

# Technologies Used
Frontend: React
Backend: Node.js, Express.js
WebSocket Communication: Socket.IO
Others: HTML, CSS

# Installation

Prerequisites
-Node.js (v14 or later)
-npm (Node Package Manager)

## Steps

### Clone the repository:

`git clone https://github.com/username/real-time-code-editor.git`

### Navigate to the project directory:

`cd real-time-code-editor`

## Install dependencies for both frontend and backend:
### Frontend
```npm install
cd client 
npm install -g yarn
```
## Backend
```yarn server.dev```

Start the development server:
### Frontend
`yarn start`

### Backend 
`yarn server:dev`

This command will start both the frontend and backend servers.

# Usage

1. Open your browser and navigate to the provided local URL (e.g., http://localhost:3000).
2. Start a new session or join an existing one by sharing the session link.
3. Begin editing code collaboratively with other users in real time.
