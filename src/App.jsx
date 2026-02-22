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

  // lo que se escribe (se filtra en tiempo real)
  const [searchInput, setSearchInput] = useState("");
  const [houseInput, setHouseInput] = useState("");

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
      const matchesName = normalize(c.name).includes(normalize(searchInput));
      const matchesHouse =
        normalize(houseInput) === "" ||
        normalize(c.house).includes(normalize(houseInput));

      return matchesName && matchesHouse;
    });
  }, [characters, searchInput, houseInput]);

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
              <div className="filters-container">
                <FilterName search={searchInput} setSearch={setSearchInput} />
                <FilterHouse house={houseInput} setHouse={setHouseInput} />
              </div>

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
