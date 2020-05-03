import { firestore } from '../firebase';

export const getFirestore = async (collection, doc) => {
    return await firestore
        .collection(collection)
        .doc(doc)
        .get()
        .then(doc => {
            if (doc.exists) {
                return doc.data();
            } else {
                console.log('No such document!');
            }
        })
        .catch(error => {
            console.log('Error getting document:', error);
        });
};

export const setDataReset = async (dataObj, collection, doc) => {
    console.log(dataObj);
    await firestore
        .collection(collection)
        .doc(doc)
        .set(dataObj);
};

const setFirestore = async (dataObj, collection, doc) => {
    await firestore
        .collection(collection)
        .doc(doc)
        .set(dataObj);
};

export default setFirestore;
