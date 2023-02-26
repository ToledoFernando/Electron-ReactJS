export const GETMUSIC = "GETMUSIC";
export const SETMUSIC = "SETMUSIC";
import { music } from "../pages/musicClass";

interface Action {
  type: string;
  payload: Array<any>;
}

// interface music {
//   ruta: string;
//   name: string;
// }

export const getMusic = (ruta: Array<any>): any => {
  return async (dispatch: any): Promise<Action> => {
    const music = await musicFolder(ruta);
    return dispatch({
      type: GETMUSIC,
      payload: music,
    });
  };
};

export const setMusic = ({ name, ruta, sig, ant }: music) => {
  return {
    type: SETMUSIC,
    payload: { name, ruta, sig, ant },
  };
};
