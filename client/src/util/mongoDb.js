export async function fetchFromMongoDB(apiPoint) {
  try {
    const response = await fetch(
      'https://lyra.et-inf.fho-emden.de:20112/_api/' + apiPoint
    );
    if (!response.ok) {
      throw new Error('Failed to fetch games from MongoDB');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching games from MongoDB:', error);
    throw error;
  }
}
