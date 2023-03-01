import { useDispatch } from "react-redux";
import { setMusic } from "../../store/action";

function MusicList({ musicas }) {
  const dispatch = useDispatch();

  let current = musicas.head;
  const lista = [];

  while (current.next !== null) {
    let musica = current;
    lista.push(
      <button onClick={() => dispatch(setMusic(musica))} key={current.value.id}>
        {current.value.name}
      </button>
    );
    current = current.next;
  }
  return lista;
}

export default MusicList;
