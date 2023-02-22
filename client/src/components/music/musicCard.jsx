import "./MusicCard.scss";

function MusicCard({ data, set }) {
  return (
    <div className="card" onClick={set}>
      <h5>{data.name.slice(0, data.name.length - 4)}</h5>
    </div>
  );
}

export default MusicCard;
