import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Musiccard from "../../Components/musicD/Musiccard";
import { getHistory } from "../../store/action";
import "./History.scss";

function History() {
  const dispatch = useDispatch();
  const hd = useSelector((state) => state.hd);

  useEffect(() => {
    dispatch(getHistory());
  }, []);
  return (
    <div className="History" id="historyDownload">
      <button className="volverDownload">
        <a href="#DownloadPage">Pagina de Descarga</a>
      </button>
      <h1>Historial de Descargas</h1>

      <div className="element">
        {!hd.length ? (
          <h1>Sin elementos</h1>
        ) : (
          hd.map((e) => <Musiccard name={e} />)
        )}
      </div>
    </div>
  );
}

export default History;
