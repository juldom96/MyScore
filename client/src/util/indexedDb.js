import Localbase from 'localbase';
const db = new Localbase('db');

export async function getAllDataFromCollection(collection) {
  try {
    const data = await db.collection(collection).get();
    return data;
  } catch (error) {
    console.error('Error getting data from Localbase:', error);
    throw error;
  }
}
export async function addDataToCollection(data, collection) {
  try {
    await db.collection(collection).add(data);
  } catch (error) {
    console.error('Error adding data to Localbase:', error);
    throw error;
  }
}

export async function deleteDataFromCollection(id, collection) {
  try {
    await db.collection(collection).doc(id).delete();
  } catch (error) {
    console.error('Error deleting data from Localbase:', error);
    throw error;
  }
}

export async function getDataFromCollectionById(collection, id) {
  try {
    return await db.collection(collection).doc(id).get();
  } catch (error) {
    console.error('Error getting data from Localbase:', error);
    throw error;
  }
}

export async function updateDataInCollection(data, collection, id) {
  try {
    await db.collection(collection).doc(id).update(data);
  } catch (error) {
    console.error('Error updating data from Localbase:', error);
    throw error;
  }
}
export async function overwriteDataInCollectionById(data, collection, id) {
  try {
    await db.collection(collection).doc(id).set(data);
  } catch (error) {
    console.warn('Error overwriting data from Localbase:', error);
    try {
      await addDataToCollection(data, collection);
    } catch (e) {
      console.warn('Error adding data to Localbase:', e);
    }
  }
}

export default db;
