import CharacterCard from "./characterCard";

function CharacterList({ characters }) {
  if (!characters.length) {
    return <p className="empty">No hay personajes que coincidan.</p>;
  }

  return (
    <section className="characters-grid">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  );
}

export default CharacterList;
