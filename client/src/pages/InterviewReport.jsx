import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIterviewById } from "../services/InterviewServices";
import Step3Report from "../components/Step3Report";

const InterviewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getIterviewById(id);
        console.log(response);
        setReport(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReport();
  }, []);

  if(!report){
    return(
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading Report...
        </p>
      </div>
    )
  }

  return <Step3Report report={report} />;
};

export default InterviewReport;
