import React, { useRef, useState, useEffect } from "react";
import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "../components/Timer.jsx";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const Step2Interview = ({ interviewData, onFinish }) => {
  const { interview_id, questions, username } = interviewData;
  const [isMicOn, setIsMicOn] = useState(false);
  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isAiPlaying, setIsAiPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timelimit || 60);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      if (!voices.length) return;

      // Try known female voices
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("hazel") ||
          voice.name.toLowerCase().includes("susan") ||
          voice.name.toLowerCase().includes("heera") ||
          voice.name.toLowerCase().includes("zira") ||
          voice.name.toLowerCase().includes("female"),
      );
      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }
      // Try known male voices
      const maleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("david") ||
          voice.name.toLowerCase().includes("ravi") ||
          voice.name.toLowerCase().includes("george") ||
          voice.name.toLowerCase().includes("mark") ||
          voice.name.toLowerCase().includes("male"),
      );
      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }
      // Fallback: first voice (female voice)
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Toogle video according to voice
  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo

  // Speak function
  const speakText = (text) => {
    return new Promise((resolve) => {
      if(!window.speechSynthesis || !selectedVoice){
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      // Add natural pauses after commas and periods
      const humanText = text.replace(/,/g, ", ...").replace(/\./g ,". ...");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;

      // Human-like pacing
      utterance.rate = 0.92
      utterance.pitch = 1.05
      utterance.volume = 1
      
      // Play video when ai start talking
      utterance.onstart = () => {
        setIsAiPlaying(true)
        videoRef.current?.play();
      }
      // Stop video
      utterance.onend = () => {
        videoRef.current?.pause()
        videoRef.current.currentTime = 0;
        setIsAiPlaying(false);

        // Setting subtitles
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300)
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    })
  }

  // To call speakText function
  useEffect(() => {
    if (! selectedVoice) {
      return;
    }
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(`Hi ${username.split(" ")[0] || username }, it's great to meet you today. I hope you're feeling confident and ready.`);
        await speakText(`I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.`);
        setIsIntroPhase(false)
      }else if(currentQuestion) {
        await new Promise(r => setTimeout(r, 800));
        // If last question (hard level)
        if(currentIndex === questions.length - 1){
          await speakText(`Alright, this one might be a bit challenging. Take your time and give it your best.`);
        }
        await speakText(currentQuestion.question);
      }
    }
    runIntro()
    
  }, [selectedVoice, isIntroPhase, currentIndex])

  // Timer setup
  useEffect(() => {
    if(isIntroPhase) return;
    if(!currentQuestion) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if(prev <= 1){
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      })
    }, 1000);
    return ()=> clearInterval(timer);

  }, [isIntroPhase, currentIndex])
  
  

  return (
    <div className="min-h-screen bg-linear-to-br from-lime-200 via-gray-50 to-teal-200 flex items-center justify-center p-4 sm:p-6">

      {/* data mount -> load voice -> intro speak -> question speak -> mic on -> timer running -> submit -> feedback speed -> next question -> repeat -> finish */}
      <div className="w-full max-w-350 min-h-[80vh] flex rounded-3xl flex-col lg:flex-row border border-gray-200 overflow-hidden shadow-2xl bg-white">

        {/* video section */}
        <div className="w-full flex flex-col items-center lg:w-[35%] bg-white p-6 space-y-6 border-r border-gray-200">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* subtitle area */}
          {subtitle && (
            <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed">{subtitle}</p>
            </div>
          )}

          {/* timer area */}
          <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-gray-200 shadow-md space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Interview Status</span>
              {isAiPlaying && <span className="text-sm font-semibold text-emerald-500">
                {isAiPlaying ? "AI Speaking" : ""}
              </span>}
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-center">
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timelimit} />
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <span className="text-2xl font-bold text-emerald-600">
                  {currentIndex + 1}
                </span>
                <span className="text-xs text-gray-500">Current Question</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-emerald-600">
                  {questions.length}
                </span>
                <span className="text-xs text-gray-500">Total Questions</span>
              </div>
            </div>
          </div>
        </div>
        {/* text section */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-500 mb-6">
            AI Smart Interview
          </h2>
          {! isIntroPhase && <div className="relative mb-6 bg-stone-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <div className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
              {currentQuestion?.question}
            </div>
          </div>}
          <textarea
            name=""
            id=""
            value={answer}
            onChange={(e)=>setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 bg-neutral-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-400 transition text-gray-800"
          />
          <div className="flex items-center gap-4 mt-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg"
              onClick={() => {
                setIsMicOn(!isMicOn);
                console.log(`Mic is now ${!isMicOn ? "ON" : "OFF"}`);
              }}
            >
              {isMicOn ? (
                <FaMicrophoneSlash size={18} />
              ) : (
                <FaMicrophone size={18} />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 sm:py-4 rounded-2xl shadow-lg transition hover:opacity-90"
              onClick={() => console.log("object")}
            >
              Submit Answer
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Interview;
