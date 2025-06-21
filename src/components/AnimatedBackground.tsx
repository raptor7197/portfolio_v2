
import React from "react";

const AnimatedBackground = () => (
  <div
    className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    style={{ background: "#0f0c24" }}
  >
    <div
      className="absolute w-[60vw] h-[60vw] top-[-20vw] left-[-15vw]"
      style={{
        background: "radial-gradient(circle at 40% 60%, #86e7ffcc 0%, transparent 70%)",
        filter: "blur(90px)",
        opacity: 0.26,
      }}
    />
    <div
      className="absolute w-[50vw] h-[50vw] bottom-[-18vw] right-[-15vw]"
      style={{
        background: "radial-gradient(circle at 60% 30%, #f0b7ffd1 0%, transparent 75%)",
        filter: "blur(110px)",
        opacity: 0.19,
      }}
    />
    <div
      className="absolute w-[38vw] h-[38vw] top-[30vh] left-[60vw]"
      style={{
        background: "radial-gradient(circle at 60% 80%, #ccf6dd 0%, transparent 70%)",
        filter: "blur(80px)",
        opacity: 0.12,
      }}
    />
    <div
      className="absolute w-[40vw] h-[40vw] bottom-[12vh] left-[10vw]"
      style={{
        background: "radial-gradient(circle at 30% 40%, #9574d6 0%, transparent 80%)",
        filter: "blur(110px)",
        opacity: 0.11,
      }}
    />
  </div>
);

export default AnimatedBackground;
