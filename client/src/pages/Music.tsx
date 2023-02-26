import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMusic } from "../store/action";
import { StateType } from "../store/reducer";
import MyMusic from "./musicClass";

let url: never[] = [];

export default function Music() {
  const dispatch = useDispatch();

  const musicas = useSelector((state: StateType) => state.musicas);
  const musicaACT = useSelector((state: StateType) => state.musicaAct);

  useEffect(() => {
    dispatch(getMusic([]));
  }, []);
  return (
    <>
      <h1>Hello world</h1>
      {musicaACT.name ? (
        <>
          <h1>{musicaACT.name}</h1>
          {console.log(musicaACT)}
        </>
      ) : (
        <h1>Sin musica</h1>
      )}
      {!musicas.length ? (
        <h1>Cargando</h1>
      ) : (
        musicas.map((e, index) => {
          const obj = {
            name: e.name,
            ruta: e.ruta,
            ant: musicas[index - 1],
            sig: musicas[index + 1],
          };
          const m = new MyMusic(obj);
          return m.setRender();
        })
      )}
    </>
  );
}
