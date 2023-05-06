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

export async function getDocsById(collectionName, id) {
  const collection = firestore().collection(collectionName).where('docId', '==', id);
  const snapshot = await collection.get();
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