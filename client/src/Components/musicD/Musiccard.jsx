import { useDispatch } from "react-redux";
import { deleteMusicHistory, getHistory } from "../../store/action";
import "./Card.scss";

function Musiccard({ name }) {
  const dispatch = useDispatch();

  const deleteMusic = (e) => {
    dispatch(deleteMusicHistory(e));
    dispatch(getHistory());
    // alert("XD");
  };
  return (
    <div className="card">
      <p>{name}</p>
      <button onClick={() => deleteMusic(name)}>Delete</button>
    </div>
  );
}

export default Musiccard;
