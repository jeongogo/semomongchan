import firestore from '@react-native-firebase/firestore';

export async function getDocs(collectionName) {
  const collection = firestore().collection(collectionName);
  // const snapshot = await collection.orderBy("date", "desc").get();
  const snapshot = await collection.get();
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function getDocsBySearch(collectionName, key, text) {
  const collection = firestore().collection(collectionName);
  // const snapshot = await collection.orderBy("date", "desc").get();
  const snapshot = await collection.where(key, 'array-contains', text).get();
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(data);
  return data;
}

export async function getDocsByKey(collectionName, key, value) {
  const collection = firestore().collection(collectionName).where(key, '==', value);
  const snapshot = await collection.orderBy('created', 'desc').get();
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function getDoc(collectionName, id) {
  const collection = firestore().collection(collectionName).doc(id);
  const data = await collection.get();
  return data.data();
}

export async function createDoc(collectionName, data) {
  const collection = firestore().collection(collectionName);
  const res = await collection.add(data);
  return res;
}

export async function updateDoc(collectionName, id, data) {
  const collection = firestore().collection(collectionName);
  await collection.doc(id).update(data);
  return true;
}