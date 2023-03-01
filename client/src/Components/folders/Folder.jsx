import { useSelector, useDispatch } from "react-redux";
import { getMusicFolder } from "../../store/action";

function Folder({ set, url }) {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folders);

  const handleFolder = (folderName) => {
    let rutas = [...url, folderName];
    set(rutas);
    dispatch(getMusicFolder(rutas));
  };

  const back = () => {
    let ruta = url.slice(0, url.length - 1);
    dispatch(getMusicFolder(ruta));
    set(ruta);
  };

  return (
    <div>
      {url.length >= 1 ? <button onClick={back}>Volver</button> : null}
      {folders.map((e) => {
        return (
          <button key={e.name} onClick={() => handleFolder(e.name)}>
            {e.name}
          </button>
        );
      })}
    </div>
  );
}

export default Folder;
