import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";


export const stepsArray = [
  {
    icon: <BsRobot size={24}/>,
    step: "Step 1",
    title: "Role & Experience Selection",
    description: "AI adjusts the interview difficulty based on your selected role and experience level."
  },
  {
    icon: <BsMic size={24}/>,
    step: "Step 2",
    title: "Smart Voice Interview",
    description: "Dynamic follow-up questions based on your answers."
  },
  {
    icon: <BsClock size={24} />,
    step: "Step 3",
    title: "Timer Based Simulation",
    description: "Real interview environment with time limits for each question."
  }
];