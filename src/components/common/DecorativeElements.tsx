import React from 'react';

export const FloatingDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left Floating Strawberry */}
      <div className="absolute top-12 left-[5%] animate-float-slow opacity-60 text-2xl select-none">
        🍓
      </div>
      {/* Top Right Floating Ribbon */}
      <div className="absolute top-20 right-[8%] animate-float-reverse opacity-70 text-xl select-none">
        🎀
      </div>
      {/* Center Left Floating Heart */}
      <div className="absolute top-1/2 left-[3%] animate-float-reverse opacity-50 text-xl select-none">
        💖
      </div>
      {/* Center Right Floating Gift */}
      <div className="absolute top-2/3 right-[4%] animate-float-slow opacity-60 text-2xl select-none">
        🎁
      </div>
      {/* Bottom Floating Berry */}
      <div className="absolute bottom-10 left-[15%] animate-float-slow opacity-40 text-xl select-none">
        🌸
      </div>
    </div>
  );
};
