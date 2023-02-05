import { useEffect, useState } from "react";

function Reproducir({ data }) {
  useEffect(() => {
    const a = async () => {
      if (data.ruta) {
        const xd = await music(data.name);
        const div = document.getElementById("div");
        div.appendChild(xd);
        // xd.play();
      }
    };
    a();
  }, [data]);

  return (
    <div>
      {!data.name ? (
        <h1>Sin musica</h1>
      ) : (
        <div id="div">
          <h1>{data.name}</h1>
        </div>
      )}
    </div>
  );
}

export default Reproducir;
