import hrImg from "../assets/images/HR.png"
import techImg from "../assets/images/tech.png"
import confidenceImg from "../assets/images/confi.png"
import creditImg from "../assets/images/credit.png"
import evalImg from "../assets/images/ai-ans.png"
import resumeImg from "../assets/images/resume.png"
import pdfImg from "../assets/images/pdf.png"
import analyticsImg from "../assets/images/history.png"
import {   BsBarChart, BsFileEarmarkText } from "react-icons/bs"

export const aiArray = [
    {
        image: evalImg,
        icon: <BsBarChart size={20}/>,
        title: "AI answer evaluation",
        description: "Scores communication, technical accuracy and confidence."
    },
    {
        image: resumeImg,
        icon: <BsFileEarmarkText size={20}/>,
        title: "Resume Analysis",
        description: "Detailed review of your resume for keywords and structure."
    },
    {
        image: pdfImg,
        icon: <BsFileEarmarkText size={20}/>,
        title: "Downloadable PDF Report",
        description: "Comprehensive report with scores, feedback and improvement tips."
    },
    {
        image: analyticsImg,
        icon: <BsBarChart size={20}/>,
        title: "Progress Tracking",
        description: "Track your improvement over time with historical performance data."
    }
]

export const modesArray = [
    {
        image: hrImg,
        title: "HR Interview Mode",
        description: "Simulate a real HR interview scenario."
    },
    {
        image: techImg,
        title: "Technical Interview Mode",
        description: "Deep technical questions and problem-solving scenarios."
    },
    {
        image: confidenceImg,
        title: "Confidence Building",
        description: "Improve your self-assurance and communication skills."
    },
    {
        image: creditImg,
        title: "Credits System",
        description: "Earn credits for completing interviews and improving your skills."
    }
]