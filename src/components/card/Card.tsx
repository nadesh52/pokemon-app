import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ content }: any) => {
  const navigate = useNavigate();

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="__card" onClick={() => navigate(`/p/${content.id}`)}>
      <img className="__card--img" src={content.sprite} alt="sprite" />
      <p>{capitalize(content.name)}</p>
    </div>
  );
};

export default Card;
