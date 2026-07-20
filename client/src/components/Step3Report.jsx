import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "motion/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Step3Report = ({ report }) => {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }

  const {
    final_score = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    question_wise_score = [],
  } = report;

  const questionScoreData = question_wise_score.map((score, index) => ({
    name: `Q ${index + 1}`,
    score: score.score || 0,
  }));


  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagLine = "";

  if (final_score >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagLine = "Excellent clarity and structured responses.";
  } else if (final_score >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagLine = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagLine = "Work on clarity and confidence.";
  }

  const score = final_score;
  const percentage = (score / 10) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 px-4 sm:px-6 lg:px-10 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Heading */}
        <div className="md:mb-10 w-full flex items-center gap-4 ">
          <button
            onClick={() => navigate("/history")}
            className="mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <FaArrowLeft className="text-gray-600" size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex-nowrap">
              Interview Report
            </h1>
            <p className="text-gray-500 mt-2">
              Get your AI generated performance insights
            </p>
          </div>
        </div>
        <button className="px-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap">
          Download PDF
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left area */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center"
          >
            <h3 className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              Overall Performance
            </h3>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "20px",
                  pathColor: "#10b981",
                  trailColor: "#E5E7EB",
                  textColor: "#111827",
                })}
              />
            </div>
            <div className="mt-4">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {performanceText}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {shortTagLine}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
              Skill Evaluation
            </h3>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                    <span>{skill.label}</span>
                    <span className="font-bold text-emerald-700">
                      {skill.value}
                    </span>
                  </div>
                  <div className="bg-gray-200 h-2 sm:h-3 rounded-full">
                    <div
                      className="bg-green-400 h-full rounded-full"
                      style={{ width: `${skill.value * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Right area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8"
          >
            <h3 className="font-semibold text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
              Performance Analysis
            </h3>
            <div className="h-64 sm:h-74">
              {/* Graph */}
              {questionScoreData.length === 0 ? (<div className="text-sm text-gray-500">No data to show in the graph</div>) : (
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={questionScoreData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name"/>
                  <YAxis domain={[0,10]} label="Score"  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    fill="url(#colorPv)"
                    fillOpacity={1}
                  />
                </AreaChart>
                </ResponsiveContainer>)}
            </div>
          </motion.div>
          <motion.div
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">Questionwise Breakedown</h3>
              <div className="space-y-6">
                {question_wise_score.map((q,index)=>(
                  <div key={index} className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Question {index + 1}</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">{q.question || "Question is not available"}</p>
                      </div>
                      <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit">
                        {q.score ?? 0}/10
                      </div>
                    </div>
                    <div className="bg-green-100 border-green-200 p-4 rounded-lg">
                      <p className="text-xs text-green-600 font-semibold mb-1">AI Feedback</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {q.feedback && q.feedback.trim() !== "" ? q.feedback : "No feedback available."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Step3Report;
