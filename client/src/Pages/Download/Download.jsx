import { useEffect, useState, useRef } from "react";
import ButtonPlay from "../../../public/otroPlay.svg";
import ButtonPause from "../../../public/otroPause.svg";
import downloadSVG from "../../../public/download.svg";
import load from "../../../public/load.svg";
import { useDispatch } from "react-redux";
import "./Download.scss";
import { getHistory, getMusicFolder } from "../../store/action";

function Download() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const video = useRef();
  const [data, setData] = useState(null);
  const [play, setPlay] = useState(true);
  const [timeV, setTimeV] = useState(0);
  const [duration, setDuration] = useState(10);
  const [porcentaje, setPorcentaje] = useState(0);
  const [buscando, setBuscando] = useState(false);
  const [timeVideo, setTimeVideo] = useState(0);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const downloadM = () => {
    let musicas = localStorage.getItem("MusicD");
    if (musicas != null) {
      const m = JSON.parse(musicas);
      m.push(data.title);
      localStorage.setItem("MusicD", JSON.stringify(m));
      dispatch(getHistory());
      return send("downloadMusic", data);
    }
    localStorage.setItem("MusicD", JSON.stringify([data.title]));
    return send("downloadMusic", data);
  };

  const getInfoMusic = async (e) => {
    setData(null);
    setBuscando(true);
    e.preventDefault();
    const info = await getMusicInfo(url);
    setData(info);
    setPorcentaje(0);
    setBuscando(false);
  };

  const handleTime = () => {
    setTimeVideo(Math.floor(video.current.currentTime));
    setTimeV(Math.floor(video.current.currentTime));
  };

  const handleTimeChang = (e) => {
    video.current.currentTime = e.target.value;
    video.current.play();
  };

  const handleChangeVolument = (e) => {
    video.current.volume = e.target.value * 0.01;
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

  const time = (num) => {
    const minutos = Math.floor(num / 60);
    const segundos = Math.floor(num % 60);
    if (segundos > 9) return `${minutos}:${segundos}`;
    return `${minutos}:0${segundos}`;
  };

  useEffect(() => {
    received("newProgress", (event, data) => {
      setPorcentaje(data);
    });
  }, []);
  return (
    <div id="DownloadPage" className="downloadPage">
      <button className="volver" onClick={() => dispatch(getMusicFolder())}>
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
        buscando ? (
          <img className="load" src={load} width={60} height={60} />
        ) : (
          <h1 className="sinDatos">Coloque una URL para buscar un video</h1>
        )
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
                height={210}
              ></video>

              <div className="controles">
                <div className="time">
                  <label>{time(timeVideo)}</label>
                  <label>{time(duration)}</label>
                </div>
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
                  <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={100}
                    onChange={handleChangeVolument}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opciones">
            {/* <div className="video" onClick={download}>
              <img src={downloadSVG} alt="" />
              <button>Descargar Video</button>
            </div> */}
            <div className="musica" onClick={downloadM}>
              <img src={downloadSVG} alt="" />
              <button>Descargar Musica</button>
            </div>
            <div className="reset">
              <button onClick={() => setData(null)}>reset</button>
            </div>
          </div>
          <div className="videoProgresBar">
            <div className="progress" style={{ width: `${porcentaje}%` }}></div>
            <label>{porcentaje < 99.45 ? porcentaje : 100.0}%</label>
          </div>
        </div>
      )}
      <button className="verHistorial">
        <a href="#historyDownload">Historial de descarga</a>
      </button>
    </div>
  );
}

export default Download;
