import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ObjectId } from 'bson';

export default function NewGameForm({ games, addGame, goBack }) {
  const [gameName, setGameName] = useState('');
  const [formError, setFormError] = useState(null);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: '',
      info: '',
    },
  ]);
  function addCategory() {
    const newCategories = [...categories];
    const newId =
      categories.length === 0 ? 1 : categories[categories.length - 1].id + 1;
    newCategories.push({ id: newId, name: '', info: '' });
    setCategories(newCategories);
  }

  function removeCategory(id) {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  }

  function handleChange(value, id, field) {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, [field]: value } : category
    );
    setCategories(updatedCategories);
  }

  const validateForm = () => {
    if (!gameName.trim()) {
      setFormError('Bitte geben Sie einen Namen für das Spiel ein.');
      return false;
    }

    if (games) {
      const gameExists = games.some(
        (existingGame) =>
          existingGame.name.toLowerCase() === gameName.trim().toLowerCase()
      );
      if (gameExists) {
        setFormError('Ein Spiel mit diesem Namen existiert bereits.');
        return false;
      }
    }
    if (!categories || categories?.length === 0) {
      setFormError('Mindestens eine Wertungskateorie wird benötigt.');
      return false;
    }
    for (const category of categories) {
      if (!category.name.trim()) {
        setFormError('Bitte geben Sie einen Namen für alle Kategorien ein.');
        return false;
      }
    }
    return true;
  };

  const saveGame = () => {
    if (validateForm()) {
      const _id = new ObjectId().toHexString();
      const newGame = {
        _id: _id,
        name: gameName.trim(),
        rows: categories,
      };
      addGame(newGame);
      goBack();
    }
  };

  return (
    <>
      <h1>Neues Spiel</h1>
      <form>
        <label>Name</label>
        <input
          className="new-game-form"
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        ></input>
        {categories.map((category, index) => {
          return (
            <div className="game-card d-grid gap-2" key={category.id}>
              <h2>{index + 1}. Kategorie</h2>
              <label>Name</label>
              <input
                type="text"
                className="new-game-form"
                value={category.name}
                onChange={(e) =>
                  handleChange(e.target.value, category.id, 'name')
                }
              ></input>
              <label>Beschreibung</label>
              <textarea
                className="new-game-form"
                value={category.info}
                onChange={(e) =>
                  handleChange(e.target.value, category.id, 'info')
                }
              />
              <Button
                variant="danger"
                onClick={() => removeCategory(category.id)}
              >
                Entfernen
              </Button>
            </div>
          );
        })}
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <div className="d-grid gap-2">
          <Button variant="secondary" onClick={addCategory}>
            <i className="bi bi-plus"></i> Neue Kategorie
          </Button>
          <Button onClick={saveGame}>Speichern</Button>
        </div>
      </form>
    </>
  );
}
