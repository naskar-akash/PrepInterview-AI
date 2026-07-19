import React from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ timeLeft, totalTime}) => {

    const getPathColor = (percentage) => {
        if (percentage > 80) return "#33cc33"; // green
        if (percentage > 60) return "#8cff1a"; // lime
        if (percentage > 40) return "#ffff00"; // yellow
        if (percentage > 20) return "#ff6600"; // dark orange
        return "#ff0000"; // red
    }


    const percentage = Math.max(
    0,
    Math.min(100, (timeLeft / totalTime) * 100)
  );
  return (
    <div className='w-20 h-20'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
            textSize: "28px",
          pathColor: getPathColor(percentage),
          trailColor: "#E5E7EB",
          textColor: "#111827",
          strokeWidth: 10,
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  )
}

export default Timer
