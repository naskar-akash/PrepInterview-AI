# PrepInterview-AI

An AI-powered interview preparation platform that helps job seekers practice technical interviews, receive personalized feedback, and track their improvement.

## Overview

PrepInterview-AI is an AI-assisted interview preparation platform that helps candidates improve their interview skills through personalized mock interviews, AI-generated technical questions, and detailed performance analysis.

The platform analyzes a user's resume or asked for role and experience, generates role-specific interview questions, conducts mock interview sessions, evaluates responses using AI, and provides actionable feedback to improve confidence and interview performance.

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

## Tech Stack

- Frontend: React JS, Tailwind CSS
- Backend: Flask(Python), MySQL, SQLAlchemy
- Authentication: Firebase Google Authentication
- AI: OpenAI API
- Payment Gateway: Razorpay

## Getting Started

### Prerequisites

- Git
- A modern code editor such as Visual Studio Code
- Dependencies required by your project

### Installation

```bash
git clone <repository-url>
cd PrepInterview-AI
# Install project dependencies here
```

### Running the Project

```bash
# Add the command to start your app here
```

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


## Developed by

This project is developed by Akash Naskar.
- Linkedin: `https://www.linkedin.com/in/akash-naskar-82b332373/`