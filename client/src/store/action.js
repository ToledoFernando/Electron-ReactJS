import { List } from "../music/Class/List";

export const GETMUSICFOLDER = "GETMUSICFOLDER";
export const SETMUSIC = "SETMUSIC";

export const getMusicFolder = (ruta) => {
  return async (distpatch) => {
    const list = new List();
    let a;
    if (ruta) {
      a = await musicFolder(ruta);
    } else {
      a = await musicFolder();
    }
    await a.mp3File?.forEach((e) => list.push(e));

    return distpatch({
      type: GETMUSICFOLDER,
      payload: { list, folder: a.folders },
    });
  };
};

export const setMusic = (music) => {
  return {
    type: SETMUSIC,
    payload: music,
  };
};
