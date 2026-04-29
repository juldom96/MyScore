import { SELFIE } from '../util/enums';
import {
  overwriteDataInCollectionById,
  getDataFromCollectionById,
} from './indexedDb';
import defaultAvatar from '../assets/avatars/default.png';

//Liest selfie aus indexedDB
async function fetchSelfie(id) {
  try {
    const data = await getDataFromCollectionById('images', { player_id: id });
    return data.image;
  } catch (e) {
    throw e;
  }
}

async function setSelfie(id, setter) {
  try {
    const selfie = await fetchSelfie(id);
    setter(selfie);
  } catch (e) {
    throw e;
  }
}

function fetchAvatar(avatar) {
  return require(`../assets/avatars/${avatar}`);
}

function setAvatar(path, setter) {
  const avatar = fetchAvatar(path);
  setter(avatar);
}

export async function setProfilePicture(avatar, setter, id) {
  if (avatar !== SELFIE) {
    setAvatar(avatar, setter);
    return;
  }

  if (avatar === SELFIE && id) {
    try {
      await setSelfie(id, setter);
    } catch (e) {
      console.warn('No selfie fetched. Default selfie applied.');
      setter(defaultAvatar);
    }
  }
}

export async function fetchAvatarByPlayer(player, setter) {
  if (player && player.avatar === SELFIE) {
    try {
      const image = await getDataFromCollectionById('images', {
        player_id: player._id,
      });
      if (image) {
        setter(image.image);
      } else {
        setter(null);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
      setter(null);
    }
  }
}

export async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export async function reduceImageSize(file, size) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const width = img.width;
      const height = img.height;
      const minSize = Math.min(width, height);

      canvas.width = size;
      canvas.height = size;

      // Berechnen der Startpunkte zum Zentrieren des Quadrats
      const startX = (width - minSize) / 2;
      const startY = (height - minSize) / 2;

      ctx.drawImage(img, startX, startY, minSize, minSize, 0, 0, size, size);

      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        'image/jpeg',
        0.7
      ); // Qualität von 0.7 für die Komprimierung
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function imageSelectionHandler(
  event,
  setPreviewUrl,
  setAvatarSelection,
  _id,
  reset
) {
  const file = event.target.files[0];
  if (
    file &&
    (file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg')
  ) {
    const reducedImageBlob = await reduceImageSize(file, 300);
    setPreviewUrl(URL.createObjectURL(reducedImageBlob));
    setAvatarSelection(SELFIE);
  } else {
    reset();
    alert('Bitte wählen Sie eine gültige Bilddatei aus (PNG, JPEG, JPG).');
  }
}

export async function upload(base64, id) {
  try {
    await overwriteDataInCollectionById(
      { player_id: id, image: base64 },
      'images',
      { player_id: id }
    );
  } catch (error) {
    console.error('Error uploading selfie', error);
    alert('Fehler beim Hochladen des Bildes');
    return;
  }
}
