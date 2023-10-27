import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

/** 데이터 가져오기 */
export const fetchDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "villager"));
    const villagerData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      villagerData.push({
        name: data.name,
        favoriteColor: data.favoriteColor,
        imageUrl: data.imageUrl,
        sex: data.sex,
        birthday: data.birthday,
        personality: data.personality,
      });
    });

    return villagerData;
  } catch (error) {
    console.error(error);
  }
};
