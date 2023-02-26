import { GETMUSIC, SETMUSIC } from "./action";

const initialState = {
  musicas: [],
  musicaAnt: {},
  musicaAct: {},
  musicaSig: {},
};

export interface StateType {
  musicas: Array<any>;
  musicaAnt: any;
  musicaAct: any;
  musicaSig: any;
}

export interface ActionType {
  type: string;
  payload: any;
}

const Reducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
    case GETMUSIC:
      return { ...state, musicas: action.payload };

    case SETMUSIC:
      return {
        ...state,
        musicaAct: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Reducer;
