function FilterHouse({ house, setHouse }) {
  return (
    <div className="filter-house">
      <label htmlFor="house" className="label">
        Selecciona la Casa:
      </label>

      <input
        id="house"
        type="text"
        className="input"
        placeholder="Ej.: Gryffindor, Slytherin..."
        value={house}
        onChange={(e) => setHouse(e.target.value)}
      />
    </div>
  );
}

export default FilterHouse;
