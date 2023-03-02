import { useEffect, useState, useRef } from "react";
import ButtonPlay from "../../assets/otroPlay.svg";
import ButtonPause from "../../assets/otroPause.svg";
import downloadSVG from "../../assets/download.svg";
import "./Download.scss";

function Download() {
  const [url, setUrl] = useState("");
  const video = useRef();
  const [data, setData] = useState(null);
  const [play, setPlay] = useState(false);
  const [timeV, setTimeV] = useState(0);
  const [duration, setDuration] = useState(10);
  const [porcentaje, setPorcentaje] = useState(0);

  const [buscando, setBuscando] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const download = () => {
    send("downloadVideo", data);
  };

  const downloadM = () => {
    send("downloadMusic", data);
  };

  const getInfoMusic = async (e) => {
    setBuscando(true);
    e.preventDefault();
    const info = await getMusicInfo(url);
    setData(info);
    setPorcentaje(0);
    setBuscando(false);
  };

  const handleTime = () => {
    setTimeV(Math.floor(video.current.currentTime));
  };

  const handleTimeChang = (e) => {
    video.current.currentTime = e.target.value;
    video.current.play();
  };

  const playPause = () => {
    setDuration(video.current.duration);
    if (play) {
      setPlay(false);
      video.current.play();
    } else {
      setPlay(true);
      video.current.pause();
    }
  };

  useEffect(() => {
    received("newProgress", (event, data) => {
      setPorcentaje(data);
    });
  }, []);
  return (
    <div id="DownloadPage" className="downloadPage">
      <button className="volver">
        <a href="#Home">Volver</a>
      </button>
      <form onSubmit={getInfoMusic}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Ingrese la URL del video"
        />
        <input type="submit" value={buscando ? "Buscando..." : "Buscar"} />
      </form>
      {!data ? (
        <h1 className="sinDatos">Coloque una URL para buscar un video</h1>
      ) : (
        <div className="infoFile">
          <div className="title">
            <h1>{data.title}</h1>
            <div className="video">
              <video
                src={data.url}
                ref={video}
                width={300}
                onTimeUpdate={handleTime}
                height={200}
              ></video>
              <div className="controles">
                <input
                  type="range"
                  className="timeVideo"
                  min={0}
                  value={timeV}
                  onChange={handleTimeChang}
                  max={duration}
                />
                <div className="botones">
                  {play ? (
                    <button onClick={playPause}>
                      <img src={ButtonPlay} alt="" />
                    </button>
                  ) : (
                    <button onClick={playPause}>
                      <img src={ButtonPause} alt="" />
                    </button>
                  )}
                  <input type="range" name="" id="" />
                </div>
              </div>
            </div>
          </div>
          <div className="opciones">
            <div className="video" onClick={download}>
              <img src={downloadSVG} alt="" />
              <button>Descargar Video</button>
            </div>
            <div className="musica" onClick={downloadM}>
              <img src={downloadSVG} alt="" />
              <button>Descargar Musica</button>
            </div>
            <div>
              <button onClick={() => setData(null)}>reset</button>
            </div>
          </div>
          <div className="videoProgresBar">
            <div className="progress" style={{ width: `${porcentaje}%` }}></div>
            <label>{porcentaje < 99.7 ? porcentaje : 100.0}%</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Download;
