import { useEffect, useState } from "react";
import CarpetaCard from "../../components/carpetas/CarpetaCard";
import MusicCard from "../../components/music/musicCard";
import Reproducir from "../../components/reproducir/Reproducir";
import "./BiblioteclaLocal.scss";

let musicas = [];
let carpetas = [];
let ruta = [];

function BibliotecLoscal() {
  const [load, setLoad] = useState(false);
  const [musica, setMusica] = useState("");
  const [folder, setFolder] = useState(false);

  const music = async (dato) => {
    setLoad(false);
    musicas = [];
    carpetas = [];
    const result = await musicFolder(dato);
    result.map((m) => {
      const extencion = m.name.slice(m.name.length - 4, m.name.length);
      if (extencion === ".mp3") musicas.push(m);
      if (extencion[0] !== ".") carpetas.push(m);
    });
    setLoad(true);
  };
  useEffect(() => {
    music("\\");
  }, []);

  const volver = () => {
    ruta.pop();
    ruta.join("\\");
    if (ruta.length === 0) setFolder(false);
    music(ruta.join("\\"));
  };

  return (
    <div className="biblioteca">
      {load ? (
        <div className="b">
          <h1 className="ruta">
            {ruta.length ? `\\${ruta.join("\\")}` : "\\"}
          </h1>

          <div className="carpetas">
            {folder ? <button onClick={volver}>Volver</button> : null}
            {carpetas.map((m, index) => (
              <CarpetaCard
                key={index}
                ruta={ruta}
                data={m}
                set={setFolder}
                music={music}
              />
            ))}
          </div>

          <div className="mm">
            <div className="musicas">
              {musicas.map((m, index) => (
                <MusicCard key={index} data={m} set={() => setMusica(m)} />
              ))}
            </div>
            <Reproducir data={musica} />
          </div>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}

export default BibliotecLoscal;
