import { Link } from "react-router-dom";

function CarpetaCard({ data }) {
  return (
    <div>
      <Link to={data.name}>{data.name}</Link>
    </div>
  );
}

export default CarpetaCard;
