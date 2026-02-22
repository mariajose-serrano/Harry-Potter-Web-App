import { Link } from "react-router-dom";

function CharacterCard({ character }) {
  const placeholder =
    "https://placehold.co/210x295/ffffff/666666/?text=Sin+imagen";

  return (
    <article className="character-card">
      <Link to={`/character/${character.id}`} className="card-link">
        <img
          className="character-img"
          src={character.image || placeholder}
          alt={character.name}
          loading="lazy"
        />

        <div className="character-info">
          <h3>{character.name}</h3>
          <p>{character.house || "Desconocida"}</p>
        </div>
      </Link>
    </article>
  );
}

export default CharacterCard;
