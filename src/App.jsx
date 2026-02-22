import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.scss";

import CharacterList from "./components/characterList";
import CharacterDetail from "./components/characterDetail";
import FilterName from "./components/filterName";
import FilterHouse from "./components/filterHouse";
import logoHP from "./images/harrypotter.png";

function App() {
  const [characters, setCharacters] = useState([]);

  // lo que se escribe
  const [searchInput, setSearchInput] = useState("");
  const [houseInput, setHouseInput] = useState("");

  // lo que se aplica (al buscar)
  const [searchApplied, setSearchApplied] = useState("");
  const [houseApplied, setHouseApplied] = useState("");

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        const withId = data.map((c, index) => ({
          ...c,
          id: String(index),
        }));
        setCharacters(withId);
      });
  }, []);

  const normalize = (s) => (s ?? "").toLowerCase().trim();

  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      const matchesName = normalize(c.name).includes(normalize(searchApplied));

      const matchesHouse =
        normalize(houseApplied) === "" ||
        normalize(c.house).includes(normalize(houseApplied));

      return matchesName && matchesHouse;
    });
  }, [characters, searchApplied, houseApplied]);

  const applyFilters = () => {
    setSearchApplied(searchInput);
    setHouseApplied(houseInput);

    // debug: esto te dirá si el botón/submit está funcionando
    console.log("APLICANDO =>", { searchInput, houseInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleClear = () => {
    setSearchInput("");
    setHouseInput("");
    setSearchApplied("");
    setHouseApplied("");
    console.log("LIMPIANDO FILTROS");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <header className="logo">
              <img className="logo" src={logoHP} alt="Harry Potter" />
            </header>

            <main className="app-container">
              <form className="filters-container" onSubmit={handleSubmit}>
                <FilterName search={searchInput} setSearch={setSearchInput} />
                <FilterHouse house={houseInput} setHouse={setHouseInput} />

                <button type="submit">Buscar</button>

                {/* por si tu submit no se dispara por cualquier cosa,
                    este botón también aplica filtros por click */}
                <button type="button" onClick={applyFilters}>
                  Buscar por casa
                </button>

                <button type="button" onClick={handleClear}>
                  Limpiar
                </button>
              </form>

              <CharacterList characters={filteredCharacters} />
            </main>
          </div>
        }
      />

      <Route
        path="/character/:id"
        element={<CharacterDetail characters={characters} />}
      />
    </Routes>
  );
}

export default App;
