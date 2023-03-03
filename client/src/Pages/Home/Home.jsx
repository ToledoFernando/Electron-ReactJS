import { useEffect, useState } from "react";
import MusicList from "../../Components/MusicList/List";
import Reproductor from "../../Components/Reproductor/Reproductor";
import { useDispatch, useSelector } from "react-redux";
import { getMusicFolder } from "../../store/action";
import Folder from "../../Components/folders/Folder";
import "./Home.scss";

function Home() {
  const [url, setURL] = useState([]);
  const dispatch = useDispatch();
  const musics = useSelector((state) => state.musicas);
  const folders = useSelector((state) => state.folders);
  const [load, setLoad] = useState(true);

  const rutaM = () => {
    let ruta = "\\";
    url.forEach((e) => {
      ruta += `${e}\\`;
    });

    return ruta;
  };

  useEffect(() => {
    dispatch(getMusicFolder()).then(() => {
      setLoad(false);
    });
  }, []);
  return (
    <div className="Home" id="Home">
      {load ? (
        <h1>Cargando</h1>
      ) : (
        <>
          <div className="cd-1">
            <div className="ruta">{url.length > 0 ? rutaM() : "\\"}</div>
            <div className="folders">
              <Folder set={setURL} url={url} />
              <button className="download">
                <a href="#DownloadPage">Descargar Musica</a>
              </button>
            </div>
            {!musics.head ? null : (
              <div className="ms-act">
                <div className="musicasList">
                  <MusicList musicas={musics} />
                </div>
                <Reproductor />
              </div>
            )}
          </div>
          {/* {!musics.head ? null : } */}
        </>
      )}
    </div>
  );
}

export default Home;
