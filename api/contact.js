import { db } from "../firebase";
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";


//add information to database
const addContact = async ({ userId, name, location, address, number }) => {
    try {
        await addDoc(
            collection(db, "info"),
            {
                user: userId,
                name: name,
                location: location,
                address: address,
                number: number,
                createdAt: new Date().getTime(),
            }
        );
    } catch (err) {
        console.log(err);
    }
}

//allows to edit some field in database
const editContact = async ({ location, address, number, id }) => {
    try {
        const docref = doc(db, "info", id); {
            if (!docref.empty) {
                await updateDoc(docref, {
                    location: location,
                    address: address,
                    number: number
                }
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
}

//Delete data

const deleteContact = async (docId) => {
    try {
        const eventRef = doc(db, "info", docId);
        await deleteDoc (eventRef);
    } catch (err) {
        console.log (err);
    }
}

export {addContact, editContact, deleteContact};