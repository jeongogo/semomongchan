import firestore from '@react-native-firebase/firestore';

export const userCollection = firestore().collection('user');

export function createUser(data) {
    return userCollection.doc(data.id).set(data);
}

export async function getUser(id) {
    const doc = await userCollection.doc(id).get();
    return doc.data();
}

export async function updateUser(id, data) {
    await userCollection.doc(id).update(data);
    return true;
  }