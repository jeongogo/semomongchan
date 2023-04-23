import firestore from '@react-native-firebase/firestore';

export async function getDoc(collectionName) {
  const collection = firestore().collection(collectionName);
  // const snapshot = await collection.orderBy("date", "desc").get();
  const snapshot = await collection.get();
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

