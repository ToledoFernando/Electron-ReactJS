import { useDispatch } from "react-redux";
import { setMusic } from "../store/action";

export interface music {
  ruta: string;
  ant: string;
  name: string;
  sig: string;
}

export default class MyMusic {
  ruta: string;
  ant: string;
  name: string;
  sig: string;

  dispatch: any;
  constructor({ name, ruta, ant, sig }: music) {
    this.ruta = ruta;
    this.ant = ant;
    this.name = name;
    this.sig = sig;
    this.dispatch = useDispatch();
  }

  setRender() {
    return (
      <button
        onClick={() => {
          // const dispatch = useDispatch();
          this.dispatch(
            setMusic({
              name: this.name,
              ruta: this.ruta,
              sig: this.sig,
              ant: this.ant,
            })
          );
        }}
        key={this.name}
      >
        {this.name}
      </button>
    );
  }
}
