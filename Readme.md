# PrepInterview-AI

An AI-powered interview preparation platform that helps job seekers practice technical interviews, receive personalized feedback, and track their improvement.

## Overview

PrepInterview-AI is an AI-assisted interview preparation platform that helps candidates improve their interview skills through personalized mock interviews, AI-generated technical questions, and detailed performance analysis.

The platform analyzes a user's resume or asked for role and experience, generates role-specific interview questions, conducts mock interview sessions, evaluates responses using AI, and provides actionable feedback to improve confidence and interview performance.

---

## Features

### Resume Analysis

- Upload resumes or provide skills and experiences
- Extract skills, projects, and experience using AI
- Automatically identify relevant technologies

### AI Generate Interview Questions

- Generate technical interview questions
- Questions based on:
  1. Job role
  2. Experience level
  3. Resume skills
- Progressive difficulty (Easy → Medium → Hard)

### Mock Interview

- Interactive interview sessions
- Practice answering AI-generated questions
- Real interview-like experience

### AI Performance Report

Your Preformance report will be prepared on the basis of: 
1. Communication skill
2. Technical correctness
3. Confidence analysis
4. Personalized improvement suggestions
5. Overall interview score

### Credit System

- Purchase interview credits using Razorpay
- Secure payment verification
- Credit balance management

---

## Tech Stack

- Frontend: React JS, Tailwind CSS
- Backend: Flask(Python), MySQL, SQLAlchemy
- Authentication: Firebase Google Authentication
- AI: OpenAI API
- Payment Gateway: Razorpay

---

## 📂 Project Structure

``` 

PrepInterview-AI
│
├── client/                    # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                    # Flask Backend
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── public/
│   |   ├── _init_.py
|   |   └── db.py
|   |
│   ├── requirements.txt
│   └── main.py
│
├── README.md
└── .gitignore

```

---

##  Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/PrepInterview-AI.git
cd PrepInterview-AI
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server

# Create virtual environment
python -m venv .venv

# Activate virtual environment

# Windows
.venv\Scripts\activate

# Install Python packages
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file inside both the **client** and **server** directories.

#### Server (.env)

```env
TIDB_CONNECTION_STRING=tidb_connection_string
SECRET_KEY=your_secret_key
TIDB_PASSWORD=your_tidb_password
FRONTEND_URL=your_frontend_url
PORT=your_port
HOST=your_host
OPENAI_API_KEY=your_openai_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

#### Client (.env)

```env
VITE_SERVER_URL=your_server_url
VITE_FIREBASE_API_KEY=firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Start the Backend

```bash
cd server
python main.py
```

### 5. Start the Frontend

Open a new terminal.

```bash
cd client
npm run dev
```

You're now ready to use **PrepInterview-AI** 🎉

## Developed by

This project is developed by Akash Naskar.
*Visit my [Linkedin profile](https://www.linkedin.com/in/akash-naskar-82b332373/) to explore more projects.*
