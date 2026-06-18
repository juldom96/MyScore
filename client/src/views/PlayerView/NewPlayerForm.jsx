import AvatarList from './AvatarList';
import { deleteDataFromCollection } from '../../util/indexedDb';
import ColorCarousel from './ColorCarousel';
import Button from 'react-bootstrap/Button';
import ImageUploader from './ImageUploader';
import { useState, useRef, useEffect } from 'react';
import { upload, setProfilePicture } from '../../util/avatarSelectionHandlers';
import { SELFIE } from '../../util/enums';

export default function NewPlayerForm({
  addPlayer,
  updatePlayer,
  closeForm,
  existingPlayer,
}) {
  //states
  const fileInputRef = useRef(null);
  const [formError, setFormError] = useState(null);

  //states based on existingPlayer
  const [playerName, setPlayerName] = useState(
    existingPlayer ? existingPlayer.name : ''
  );

  const [selectedColor, setSelectedColor] = useState(
    existingPlayer ? existingPlayer.color : null
  );

  const [previewUrl, setPreviewUrl] = useState(
    existingPlayer && existingPlayer.avatar === SELFIE
      ? existingPlayer.avatar
      : null
  );

  const [avatarSelection, setAvatarSelection] = useState(
    existingPlayer ? existingPlayer.avatar : null
  );

  const [_id] = useState(
    existingPlayer ? existingPlayer._id : crypto.randomUUID()
  );

  useEffect(() => {
    async function setPicture() {
      if (existingPlayer && setPreviewUrl && existingPlayer.avatar === SELFIE)
        await setProfilePicture(
          existingPlayer.avatar,
          setPreviewUrl,
          existingPlayer._id
        );
    }
    setPicture();
  }, [existingPlayer]);

  function generatePlayer() {
    return {
      _id: _id,
      name: playerName,
      color: selectedColor,
      avatar: avatarSelection,
      played_games: existingPlayer ? existingPlayer.played_games : [],
    };
  }

  async function saveHandler(ev) {
    ev.preventDefault();
    if (!validateInput()) {
      return;
    }
    if (avatarSelection === SELFIE && previewUrl) {
      await upload(previewUrl, _id);
    }
    const player = generatePlayer();
    if (existingPlayer) {
      await updatePlayer(player);
    } else {
      await addPlayer(player);
    }
    closeForm();
  }

  function validateInput() {
    if (!playerName?.trim().length > 0) {
      setFormError('Bitte einen Namen eingeben!');
      return false;
    }
    if (!selectedColor) {
      setFormError('Bitte eine Farbe wählen!');
      return false;
    }
    if (!avatarSelection) {
      setFormError('Bitte einen Avatar wählen!');
      return false;
    }
    return true;
  }

  async function avatarSelectionHandler(avatar) {
    setAvatarSelection(avatar);
  }

  async function deleteSelfie() {
    try {
      await deleteDataFromCollection({ player_id: _id }, 'images');
    } catch (e) {
      console.warn('No selfie deleted from DB');
    }
  }

  async function deleteSelfieHandler() {
    await deleteSelfie();
    resetImageSelection();
  }

  function resetImageSelection() {
    setPreviewUrl(null);
    setAvatarSelection(null);
    fileInputRef.current.value = null;
  }

  return (
    <form onSubmit={saveHandler}>
      <h1>{existingPlayer ? 'Spieler bearbeiten' : 'Neuer Spieler'}</h1>

      {/* Name */}
      <label htmlFor="nameInput">
        <h2>Name</h2>
      </label>
      <input
        type="text"
        name="playerName"
        id="nameInput"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      ></input>
      <div className="small-spacer" />

      {/* Farbe */}
      <label>
        <h2>Farbe</h2>
      </label>
      <ColorCarousel
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      ></ColorCarousel>
      <div className="small-spacer" />

      {/* Profilbild */}
      <label>
        <h2>Avatar</h2>
      </label>
      <AvatarList
        previewUrl={previewUrl}
        avatarSelection={avatarSelection}
        setAvatarSelection={avatarSelectionHandler}
      ></AvatarList>
      <label htmlFor="selfie">
        <h2>Foto</h2>
      </label>
      <ImageUploader
        setPreviewUrl={setPreviewUrl}
        reference={fileInputRef}
        setAvatarSelection={setAvatarSelection}
        _id={_id}
        reset={resetImageSelection}
      />
      <div className="d-grid gap-2">
        {previewUrl && (
          <Button
            variant="danger"
            size="sm"
            // onClick={() =>
            //   resetImageSelection(
            //     existingPlayer,
            //     setSelectedFile,
            //     setPreviewUrl,
            //     fileInputRef
            //   )
            // }
            onClick={deleteSelfieHandler}
          >
            Foto löschen
          </Button>
        )}
        <div className="small-spacer" />

        {/* Submit */}
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <Button type="submit">Speichern</Button>
      </div>
    </form>
  );
}
