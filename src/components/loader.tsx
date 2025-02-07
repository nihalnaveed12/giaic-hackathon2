import React from "react";

const Loader = () => {
  return (
    <div className="loader relative w-12 h-12 mx-auto">
      <div
        className="loader-shadow absolute top-16 left-0 w-12 h-1.5 bg-[#f563a2] rounded-full"
        style={{
          animation: "shadow324 0.5s linear infinite",
        }}
      ></div>
      <div
        className="loader-box absolute top-0 left-0 w-full h-full bg-[#FB2E86] rounded-md"
        style={{
          animation: "jump7456 0.5s linear infinite",
        }}
      ></div>

      <style>
        {`
          @keyframes jump7456 {
            15% {
              border-bottom-right-radius: 3px;
            }
            25% {
              transform: translateY(9px) rotate(22.5deg);
            }
            50% {
              transform: translateY(18px) scale(1, 0.9) rotate(45deg);
              border-bottom-right-radius: 40px;
            }
            75% {
              transform: translateY(9px) rotate(67.5deg);
            }
            100% {
              transform: translateY(0) rotate(90deg);
            }
          }

          @keyframes shadow324 {
            0%, 100% {
              transform: scale(1, 1);
            }
            50% {
              transform: scale(1.2, 1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
