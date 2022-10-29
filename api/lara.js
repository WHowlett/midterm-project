import { db } from "../firebase";
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

//add information to database
const addLara = async ({ userId, name, relation, birth, discription }) => {
    try {
        await addDoc(
            collection(db, "lara"),
            {
                user: userId,
                name: name,
                relation: relation,
                birth: birth,
                discription: discription,
                createdAt: new Date().getTime(),
            }
        );
    } catch (err) {
        console.log(err)
    }
}

//edit field in database
const editLara = async ({ relation, discription, id }) => {
    try {
        const docref = doc(db, "lara", id);
        {
            if (!docref.empty) {
                await updateDoc(docref, {
                    relation: relation,
                    discription: discription
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

//delete entries
const deleteLara = async (docId) => {
    try {
        const eventRef = doc(db, "lara", docId);
        await deleteDoc(eventRef);
    } catch (err) {
        console.log(err);
    }
}

export {addLara, editLara, deleteLara};