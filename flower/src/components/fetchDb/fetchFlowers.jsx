import { db } from "../firebase/firebaseConfig"
import { collection, getDocs } from "firebase/firestore";

const fetchFlowers = async () => {
  const querySnapshot = await getDocs(collection(db, "flowers"));
  const flowers = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return flowers;
};

export default fetchFlowers;