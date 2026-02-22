import { Link } from "react-router-dom";

function CharacterList({ characters }) {
  if (!characters.length) {
    return <p>No hay personajes que coincidan.</p>;
  }

  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id}>
          <Link to={`/character/${character.id}`}>{character.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default CharacterList;
