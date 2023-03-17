import { List } from "../music/Class/List";

export const GETMUSICFOLDER = "GETMUSICFOLDER";
export const SETMUSIC = "SETMUSIC";
export const HD = "HD";
export const DELETEMUSICH = "DELETEMUSICH";

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

export const setMusic = (music, ruta) => {
  return async (dispacth) => {
    const result = await getBuffer(music.value.name, ruta);
    return dispacth({
      type: SETMUSIC,
      payload: { musica: music, buffer: result },
    });
  };
};

export const getHistory = () => {
  const musicas = localStorage.getItem("MusicD");
  if (!musicas) {
    return {
      type: HD,
      payload: [],
    };
  }
  return {
    type: HD,
    payload: JSON.parse(musicas),
  };
};

export const deleteMusicHistory = (name) => {
  const musica = localStorage.getItem("MusicD");
  const m = JSON.parse(musica);
  const result = m.filter((e) => e !== name);

  return {
    type: DELETEMUSICH,
    payload: result,
  };
};
