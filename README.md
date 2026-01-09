# Contact Management Web App (MERN Stack)

A simple Contact Management Web Application built using the **MERN stack** as part of a technical interview task.  
The app allows users to submit contact details and view them in real time without page reload.

---

## 🚀 Live Demo
- **Frontend:** https://contact-manager-bambam.vercel.app/
- <img width="1918" height="869" alt="image" src="https://github.com/user-attachments/assets/c7921dc2-ad49-4033-9d76-2be3fe0121d9" />



---

## 🛠 Tech Stack

### Frontend
- React.js
- useState, useEffect
- CSS / Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB (MongoDB Atlas)
- Mongoose

---

## ✨ Features

- Contact form with validation
- Fields: Name, Email, Phone, Message
- Client-side validation with error messages
- Submit button disabled if form is invalid
- Store contacts in MongoDB
- Fetch and display contacts without page reload
- Responsive UI
- Success message on submission

### Bonus
- Delete contact
- Latest contacts shown first

---

## 📂 Project Structure

![alt text](image.png)


---

## ⚙️ Backend Setup

1. Navigate to backend folder:

cd backend

2.Install dependencies:

npm install

3.Create .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
Start server:

4.Start server:
npm start
Backend runs on:
http://localhost:5000



⚙️ Frontend Setup
1.Navigate to frontend folder:
cd frontend


2.Install dependencies:

npm install
Start React app:


3.Start React app:
npm start

Frontend runs on:
http://localhost:3000


🔗 API Endpoints
![alt text](image-1.png)

🌐 Deployment
Backend
Deployed on Render / Railway

Environment variables configured in dashboard

Frontend
Deployed on Vercel / Netlify

API base URL updated in frontend

🧪 Validation Rules
Name: Required

Email: Required & valid format

Phone: Required

Message: Optional

📌 Interview Notes
Focused on functionality over UI polish

Clean code structure and separation of concerns

MongoDB Atlas used for cloud database

RESTful API design

👨‍💻 Author
Bambam Gupta
Made as part of a Web Developer Interview Task

