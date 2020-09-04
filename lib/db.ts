import firebase from './firebase'
const firestore = firebase.firestore()

export function createUser(uid: string, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export function createTournament(name: string) {
  return firestore.collection('tournaments').add({ name })
}
