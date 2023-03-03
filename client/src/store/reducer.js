import { GETMUSICFOLDER, SETMUSIC, HD, DELETEMUSICH } from "./action";

const initialState = {
  folders: [],
  musicas: {},
  ant: {},
  act: {},
  sig: {},
  hd: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GETMUSICFOLDER:
      console.log(action.payload);
      return {
        ...state,
        musicas: action.payload.list,
        folders: action.payload.folder,
      };

    case SETMUSIC:
      return {
        ...state,
        ant: action.payload.prevoius,
        act: action.payload,
        sig: action.payload.next,
      };
    case HD:
      return {
        ...state,
        hd: action.payload,
      };
    case DELETEMUSICH:
      localStorage.setItem("MusicD", JSON.stringify(action.payload));
      return {
        ...state,
        hd: JSON.stringify(action.payload),
      };
    default:
      return {
        ...state,
      };
  }
}
