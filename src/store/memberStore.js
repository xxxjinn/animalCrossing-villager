import { db, storage } from "../firebase";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

/** 데이터 가져오기 */
export const fetchDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "villager"));
    const villagerData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      villagerData.push({
        name: data.name,
        id: data.engName,
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

/** 데이터 삭제 */
export const deleteVillager = async (villager) => {
  const villagerId = villager.id;
  const villagerImg = villager.imageUrl;
  try {
    const docRef = doc(db, "villager", villagerId);
    await deleteDoc(docRef);

    const storageRef = ref(storage, villagerImg);
    await deleteObject(storageRef);

    alert("주민 삭제가 완료되었습니다!");
  } catch (error) {
    console.error("주민 삭제 오류:", error);
  }
};
