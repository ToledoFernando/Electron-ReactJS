import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMusic } from "../../store/action";
import "./Reproductor.scss";

function Reproductor() {
  const dispatch = useDispatch();
  const musicaAct = useSelector((state) => state.act);
  const [audio, setAudio] = useState(new Audio());
  const [p, setP] = useState(true);
  const [ms, setMs] = useState(true);
  const musica = useRef();
  const input = useRef();
  const [duration, setDuration] = useState(5);

  const handleChangeTime = (e) => {
    input.current.value = e.target.currentTime;
    input.current.max = musica.current.duration;
  };

  const handleChangeInput = (e) => {
    musica.current.currentTime = e.target.value;
  };

  const handleChangeVolument = (e) => {
    musica.current.volume = e.target.value * 0.01;
  };

  const playOnPause = () => {
    if (ms) {
      musica.current.pause();
      setMs(false);
    } else {
      musica.current.play();
      setMs(true);
    }
  };

  useEffect(() => {
    setP(true);
    if (musicaAct.value) {
      const blob = new Blob([musicaAct.value.buff], { type: "audio/mp3" });
      setAudio(URL.createObjectURL(blob));
      setP(false);
    }
  }, [musicaAct]);

  return (
    <div className="Reproductor">
      {p ? (
        <h1>Seleccione una musica</h1>
      ) : (
        <>
          <h1>{musicaAct.value.name}</h1>
          <audio
            id="musica"
            ref={musica}
            onEnded={() => dispatch(setMusic(musicaAct.next))}
            autoPlay
            onTimeUpdate={handleChangeTime}
            src={audio}
          ></audio>
          <input
            type="range"
            ref={input}
            onChange={handleChangeInput}
            min={0}
            max={duration}
          />

          <div>
            <input
              onChange={handleChangeVolument}
              type="range"
              min={0}
              defaultValue={100}
              max={100}
            />
            <p>Volument</p>
          </div>
          <button
            disabled={!musicaAct.prevoius}
            onClick={() => dispatch(setMusic(musicaAct.prevoius))}
          >
            ANTERIOR
          </button>

          {ms ? (
            <button onClick={playOnPause}>Stop</button>
          ) : (
            <button onClick={playOnPause}>Play</button>
          )}

          <button
            disabled={!musicaAct.next}
            onClick={() => dispatch(setMusic(musicaAct.next))}
          >
            SIGUIENTE
          </button>
        </>
      )}
    </div>
  );
}

export default Reproductor;
