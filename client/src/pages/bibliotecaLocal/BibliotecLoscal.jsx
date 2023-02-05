import { useEffect, useState } from "react";
import CarpetaCard from "../../components/carpetas/CarpetaCard";
import MusicCard from "../../components/music/musicCard";
import Reproducir from "../../components/reproducir/Reproducir";

let musicas = [];
let carpetas = [];
function BibliotecLoscal() {
  const [completo, setCompleto] = useState(true);
  const [musica, setMusica] = useState({});

  useEffect(() => {
    const music = async () => {
      setCompleto(false);
      const result = await musicFolder();
      result.map((m) => {
        const extencion = m.name.slice(m.name.length - 4, m.name.length);
        if (extencion === ".mp3") musicas.push(m);
        if (extencion[0] !== ".") carpetas.push(m);
      });
      setCompleto(true);
    };

    if (musicas.length === 0 && carpetas.length === 0) music();
  }, []);

  return (
    <div>
      {!completo ? (
        <h1>Cargando</h1>
      ) : (
        <div>
          {carpetas.map((m, index) => (
            <CarpetaCard key={index} data={m} />
          ))}

          {musicas.map((m, index) => (
            <MusicCard key={index} data={m} set={() => setMusica(m)} />
          ))}
          <Reproducir data={musica} />
        </div>
      )}
    </div>
  );
}

export default BibliotecLoscal;
