import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteInterview, getInterviews } from "../services/InterviewServices";
import { FaArrowLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllInterviews = async () => {
      const response = await getInterviews();
      console.log(response);
      setInterviews(response);
    };
    getAllInterviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteInterview(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-olive-50 to-emerald-50 py-10">
      <div className="w-[90vw] lg:w-[70vw] mmax-w-[90%] mx-auto">
        {/* Heading */}
        <div className="mb-10 w-full flex items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <FaArrowLeft className="text-gray-600" size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex-nowrap">
              Interview History
            </h1>
            <p className="text-gray-500 mt-2">
              Track your past interviews and performance reports
            </p>
          </div>
        </div>
        {/* main content */}
        {interviews.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <p className="text-gray-500">
              No interviews found. Start your first interview.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {interviews.map((item, index) => (
              <div
                onClick={() => navigate(`/report/${item.id}`)}
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* left */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.role}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.experience} | {item.mode}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(item.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                  {/* right */}
                  <div className="flex justify-evenly items-center gap-6">
                    {/* score */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600">
                        {item.final_score || 0}/10
                      </p>
                      <p className="text-xs text-gray-400">Overall score</p>
                    </div>
                    {/* status badge */}
                    <div className="flex md:flex-col items-center gap-1">
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "Completed" ? "bg-green-200 text-emerald-700" : "bg-orange-200 text-orange-700"}`}
                      >
                        {item.status}
                      </span>
                      <button
                        onClick={(e) => {
                           e.stopPropagation();
                          handleDelete(item.id)}}
                        className="px-2 py-1 text-red-700"
                      >
                        <MdDeleteForever className="size-6 hover:size-7" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewHistory;
