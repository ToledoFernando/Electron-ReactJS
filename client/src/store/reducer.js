import { GETMUSICFOLDER, SETMUSIC } from "./action";

const initialState = {
  folders: [],
  musicas: {},
  ant: {},
  act: {},
  sig: {},
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

    default:
      return {
        ...state,
      };
  }
}
