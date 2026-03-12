# Echo — Real-Time Chat Application

Echo is a **full-stack real-time chat application** built using the **MERN stack** with **Socket.IO**.  
It allows users to communicate instantly, share images, and see online users in real time.

This project demonstrates real-time communication, authentication, state management, and deployment of a modern web application.

---

## Live Demo

Frontend  
https://echo-eight-xi.vercel.app

Backend  
https://echo-production-cc43.up.railway.app

---

## Features

- Real-time messaging using WebSockets
- User authentication with JWT
- Secure cookie-based login system
- Online user tracking
- Send text messages instantly
- Image sharing in chat
- Responsive chat interface
- Loading states and smooth UI transitions
- Persistent message storage with MongoDB

---

## Tech Stack

### Frontend
- React
- Zustand (state management)
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB (MongoDB Atlas)

### Media Storage
- Cloudinary

### Deployment
- Frontend → Vercel
- Backend → Railway

---

## Architecture


React Frontend
│
│ REST API
▼
Node.js + Express Backend
│
│ WebSocket (Socket.IO)
▼
MongoDB Database


Messages are delivered through **Socket.IO events** for real-time updates while persistent data is stored in **MongoDB**.

---

## Project Structure


echo
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ ├── lib
│ └── socket.js
│
└── frontend
├── components
├── pages
├── store
└── lib


---

## Environment Variables

Create a `.env` file inside the **backend** directory.


PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


---

## Installation

Clone the repository


git clone https://github.com/b2pkick/echo.git

cd echo


Install backend dependencies


cd backend
npm install


Run backend server


npm run dev


Install frontend dependencies


cd ../frontend
npm install


Run frontend


npm run dev


---

## Future Improvements

- Typing indicators
- Message timestamps
- Read receipts
- Group chats
- Message reactions

---

## Author

Rahul Gupta

GitHub  
https://github.com/b2pkick

LinkedIn  
https://www.linkedin.com/in/rahul-gupta-77008b30a/

---

## License

This project is open source and available under the MIT License.