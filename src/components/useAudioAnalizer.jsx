import React, { useCallback, useEffect, useMemo, useState } from "react";

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

export default function useAudioAnalizer(HTMLMediaElementId) {
  const [ampValues, setAmpValues] = useState([]);

  useEffect(() => {
    const mediaStreamSource = audioContext.createMediaElementSource(
      document.getElementById(HTMLMediaElementId)
    );
    mediaStreamSource.connect(audioContext.destination);
    const analyser = audioContext.createAnalyser();
    analyser.ampSize = 1024;
    mediaStreamSource.connect(analyser);

    setInterval(function () {
      if (analyser) {
        const data = new Uint8Array(1024);
        analyser.getByteTimeDomainData(data);
        const normalizedSpectrum = [];
        for (let i = 0; i < data.length; i++) {
          normalizedSpectrum[i] = data[i] / 256;
        }
        setAmpValues(normalizedSpectrum);

        //var c = document.getElementById("idCanvas");
      }
    }, 50);
  }, []);

  return ampValues;
}
