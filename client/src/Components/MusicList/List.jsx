import { useDispatch } from "react-redux";
import { setMusic } from "../../store/action";

function MusicList({ musicas, url }) {
  const dispatch = useDispatch();

  let current = musicas.head;
  const lista = [];

  while (current !== null) {
    let musica = current;
    lista.push(
      <button
        onClick={() => dispatch(setMusic(musica, url))}
        key={current.value.id}
      >
        {current.value.name.slice(0, current.value.name.length - 4)}
      </button>
    );
    current = current.next;
  }
  return lista;
}

export default MusicList;
