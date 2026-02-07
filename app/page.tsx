"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function Home() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ top: string | number; left: string | number; position: "static" | "absolute" }>({
    top: "auto",
    left: "auto",
    position: "static",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (!containerRef.current) return;

    // Get dimensions of the container (the main card)
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120; // heuristic
    const buttonHeight = 50; // heuristic

    // Calculate random position within the container bounds
    // We add some padding/margins to ensure it doesn't spawn exactly on the edge or overlap too much with text if possible
    const randomX = Math.floor(Math.random() * (containerRect.width - buttonWidth - 40));
    const randomY = Math.floor(Math.random() * (containerRect.height - buttonHeight - 40));

    setNoPosition({
      top: `${Math.max(20, randomY)}px`, // Keep it at least 20px from top
      left: `${Math.max(20, randomX)}px`,
      position: "absolute",
    });

    // Optionally increment count
    // setNoCount(prev => prev + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Too slow!",
      "Missed me!",
      "Try again!",
      "Catch me!",
      "Nope!",
      "Almost!",
      "So close!",
      "Can't catch me!",
      "Oops!",
      "Not here!",
      "Wrong spot!",
      "Nice try!",
      ":P",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"],
    });

    // Continuous confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };



  if (yesPressed) {
    return (
      <div className="flex min-h-screen bg-[#e4e2fe] flex-col items-center justify-center  p-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center p-10  max-w-2xl"
        >
          <h1 className="text-3xl  playfair-display  md:text-5xl  text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            Yay! I knew you'd say YES! <span className=" text-pink-600 ">❤</span>
          </h1>
          <p className="text-xl md:text-2xl font- text-gray-700 leading-relaxed">
            Happy Valentine's Day! <br />
            see you sooonnn :3
          </p>

          <audio src="/audio2.mp3" autoPlay></audio>

          <div className="mt-10 flex justify-center gap-4 text-7xl ">
            <img src="/pengu.gif" alt="pengu" className="w-54 h-54" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-teal-50 to-rose-100 overflow-hidden relative selection:bg-rose-200 font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 text-center flex flex-col w-full max-w-5xl px-4">

        {/* Main Card */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" p-5 md:p-14 space-y-12  relative overflow-hidden"
        >

          <h1 className="text-3xl playfair-display  md:text-5xl  text-transparent bg-clip-text bg-gradient-to-br from-rose-500 to-pink-600 mb-12 drop-shadow-sm tracking-tight leading-tight">
            Will you be my Valentine? 🌹
          </h1>

          <div className=" flex justify-center rounded-3xl overflow-hidden">
            <img src="/love2.gif" alt="pengu" className="w-44 h-44 rounded-4xl backdrop-blur-sm " />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8  ">

            {/* Yes Button */}
            <motion.button
              layout
              className="rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-400 text-white font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-200 focus:outline-none ring-4 ring-transparent focus:ring-green-200 z-10 text-xl px-10 py-4"
              onClick={handleYesClick}
              whileTap={{ scale: 0.95 }}
            >
              Yes
            </motion.button>

            {/* No Button */}
            <motion.button
              className="rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 px-8 py-4 text-xl font-bold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-100 focus:outline-none ring-4 ring-transparent focus:ring-red-200 z-50 cursor-pointer"
              style={{
                position: noPosition.position,
                top: noPosition.top,
                left: noPosition.left,
              }}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onClick={handleNoHover} // Fallback
              animate={{
                x: noPosition.position === "absolute" ? 0 : 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {getNoButtonText()}
            </motion.button>
          </div>
        </motion.div>
        
      </div>

      <div className=" text-blue-300 opacity-70 absolute right-5 bottom-5">
        Crafted By Bijeesh, Software Developer
      </div>

    </div>
  );
}
