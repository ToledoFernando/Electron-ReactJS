import { useEffect } from "react";
import { List } from "../../music/Class/List";

function Home() {
  useEffect(() => {
    const mf = async () => {
      const list = new List();
      const a = await musicFolder();
      a.mp3File.map((e) => list.push(e));
      console.log(list);
    };
    mf();
  }, []);
  return <div>Home</div>;
}

export default Home;
