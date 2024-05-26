import { capitalize } from "../utils/capitalize";

const Card = ({ content }: any) => {
  return (
    <div className="__card">
      <img className="__card--img" src={content.sprite} alt="sprite" />
      <p>{capitalize(content.name)}</p>
    </div>
  );
};

export default Card;
