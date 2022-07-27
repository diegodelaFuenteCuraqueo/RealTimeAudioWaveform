import "./styles.css";
import useAudioAnalizer from "./components/useAudioAnalizer";
import Waveform from "./components/Waveform";

export default function App() {
  const an = useAudioAnalizer("audioPlayer");
  return (
    <div className="App">
      <Waveform normalizedSpectrum={an} />
    </div>
  );
}
