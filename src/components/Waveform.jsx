import React, { useRef, useEffect, useMemo, useState } from "react";

export default function Waveform({
  normalizedSpectrum,
  width = 200,
  height = 100
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.beginPath();
    for (let i = 0; i < normalizedSpectrum.length - 1; i++) {
      context.moveTo(i, normalizedSpectrum[i] * canvas.height);
      context.arc(
        i,
        normalizedSpectrum[i] * canvas.height,
        1,
        0,
        Math.PI * 2,
        true
      );
    }
    context.closePath();
    context.fill();
  }, [normalizedSpectrum]);

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />
    </>
  );
}
