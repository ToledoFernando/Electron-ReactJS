import { useDispatch } from "react-redux";
import { setMusic } from "../../store/action";

function MusicList({ musicas }) {
  const dispatch = useDispatch();

  let current = musicas.head;
  const lista = [];

  console.log(current);
  while (current !== null) {
    console.log(current.value);
    let musica = current;
    lista.push(
      <button onClick={() => dispatch(setMusic(musica))} key={current.value.id}>
        {current.value.name.slice(0, current.value.name.length - 4)}
      </button>
    );
    current = current.next;
  }
  return lista;
}

export default MusicList;
