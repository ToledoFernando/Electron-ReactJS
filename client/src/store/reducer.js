import { GETMUSICFOLDER, SETMUSIC, HD, DELETEMUSICH } from "./action";

const initialState = {
  folders: [],
  musicas: {},
  act: {},
  hd: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GETMUSICFOLDER:
      return {
        ...state,
        musicas: action.payload.list,
        folders: action.payload.folder,
      };

    case SETMUSIC:
      return {
        ...state,
        act: action.payload,
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
