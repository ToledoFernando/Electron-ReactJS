function CarpetaCard({ data, set, ruta, music }) {
  const handleChange = () => {
    set(true);
    ruta.push(data.name);
    music(ruta.join("\\"));
  };

  return (
    <div>
      <button onClick={handleChange}>{data.name}</button>
    </div>
  );
}

export default CarpetaCard;
