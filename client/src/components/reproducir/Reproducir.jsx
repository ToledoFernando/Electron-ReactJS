import { useEffect, useState, useRef } from "react";
import "./Reproducir.scss";
import playButton from "../../assets/play.svg";
import pauseButton from "../../assets/pause.svg";
import stopButton from "../../assets/stop.svg";
import nota from "../../assets/nora.svg";

function Reproducir({ data }) {
  const [msc, setMSC] = useState("");
  const [playM, setPlayM] = useState(false);
  const audio = useRef();
  const [min, setMin] = useState(0);
  // const [min, setMin] = useState(0);
  const time2 = useRef();

  const play = (a) => {
    setPlayM(true);
    a.play();
    setInterval(() => {
      time2.current.value = audio.current.currentTime;
    }, 1000);
  };

  const pause = (a) => {
    setPlayM(false);
    a.pause();
    clearInterval();
  };

  const stop = (a) => {
    a.pause();
    a.currentTime = 0;
    time2.current.value = 0;
  };

  const changeMusic = (e) => {
    audio.current.currentTime = e.target.value;
    audio.current.play();
    setMin(e.target.value);
  };

  useEffect(() => {
    const a = async () => {
      if (data.ruta) {
        const xd = await music(data.name);
        setMSC(`data:audio/mp3;base64,${xd}`);
      }
    };
    a();

    if (audio.current) setMin(audio.current.currentTime);
  }, [data]);

  return (
    <div className="Reproducir">
      {
        <div className="div">
          <div className="img">
            <img src={nota} className={playM ? "img play" : "img"} />
          </div>
          {!data.name ? (
            <h1>Seleccione una Musica</h1>
          ) : (
            <>
              <h1>{data.name.slice(0, data.name.length - 4)}</h1>
              <audio ref={audio} src={msc}></audio>

              {msc.length ? (
                <div className="opt">
                  <div className="botones">
                    {!playM ? (
                      <button onClick={() => play(audio.current)}>
                        <img src={playButton} alt="" />
                      </button>
                    ) : (
                      <button onClick={() => pause(audio.current)}>
                        <img src={pauseButton} alt="" />
                      </button>
                    )}

                    <button onClick={() => stop(audio.current)}>
                      <img src={stopButton} alt="" />
                    </button>
                  </div>
                  <input
                    className="music"
                    ref={time2}
                    type="range"
                    min={0}
                    max={audio?.current.duration}
                    onChange={changeMusic}
                    value={min}
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      }
    </div>
  );
}

export default Reproducir;
