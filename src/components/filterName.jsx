function FilterName({ search, setSearch }) {
  return (
    <div className="filter-name">
      <label htmlFor="search" className="label">
        Busca por nombre:
      </label>

      <input
        id="search"
        type="text"
        className="input"
        placeholder="Ej.: Harry, Hermione..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default FilterName;
