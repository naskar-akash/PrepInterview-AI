import React, { useState } from "react";
import { motion } from "motion/react";
import { InterviewStep1Array } from "../assets/arrays/InterviewStep1Array";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import { resumeUpload } from "../services/InterviewServices";

const Step1SetUp = ({ onStart }) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysIsDone, setAnalysIsDone] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analysing) return;
    setAnalysing(true);
    try {
      const response = await resumeUpload(resumeFile);
      setRole(response?.data.resume.role || "");
      setExperience(response?.data.resume.experience || "Fresher");
      setProjects(response?.data.resume.projects || []);
      setSkills(response?.data.resume.skills || []);
      setResumeText(response?.data.resumeText || "");

      setAnalysIsDone(true);
      setAnalysing(false);
    } catch (error) {
      console.log(error);
      setAnalysing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-center px-4 bg-linear-to-br from-gray-100 to-gray-200"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* Left section */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-linear-to-bl from-green-200 to-green-100 p-12 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Start Your AI Interview
          </h2>
          <p className="text-gray-600 mb-10">
            Practice real interview scenario powered by AI. Improve
            communication, technical skills and confidence with us.
          </p>
          <div className="space-y-4">
            {InterviewStep1Array.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer"
              >
                {item.icon}
                <span className="text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Right section */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 bg-white"
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Set Your Interview
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter role"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>
            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter experience(e.g. 2 years)"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>
            <select
              onChange={(e) => setMode(e.target.value)}
              name="mode"
              id=""
              value={mode}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
            >
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analysIsDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer hover:border-green-600 hover:bg-green-100 transition"
              >
                <FaFileUpload className="text-4xl mx-auto text-green-600 mb-3" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="text-gray-600 font-medium">
                  {resumeFile
                    ? resumeFile.name
                    : "Click here to upload resume (Optional)"}
                </p>
                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    {analysing && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {analysing ? "Analysing..." : "Analyse Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Mapping projects and experiences */}
            {analysIsDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-100 border-gray-200 rounded-xl space-y-4 p-5"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Analysed Resume
                </h3>
                {projects?.length ? (
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Projects:</p>
                    <ul className="list-disc list-inside flex flex-wrap text-gray-600 gap-2">
                      {projects.map((project, index) => (
                        <li key={index} className="text-sm">{project}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Projects:</p>
                    <p className="text-gray-500 italic">No projects found.</p>
                  </div>
                )}
                {skills?.length  ? (
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span key={index} className="bg-green-200 text-emerald-600 px-3 py-1 rounded-full text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Skills:</p>
                    <p className="text-gray-500 italic">
                      No skills found.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              disabled={!role || !experience}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full disabled:bg-gray-600 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md"
            >
              Start Interview
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1SetUp;
