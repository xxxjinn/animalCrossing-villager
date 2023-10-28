import { db, storage } from "../firebase";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

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

    alert("삭제가 완료되었습니다!");
  } catch (error) {
    console.error("주민 삭제 오류:", error);
  }
};

/**데이터 업로드 */
export const addVillager = async ({ imageUrl, villagerInfo }) => {
  try {
    const villagerDocRef = doc(db, "villager", villagerInfo.engName);
    await setDoc(villagerDocRef, {
      name: villagerInfo.name,
      engName: villagerInfo.engName,
      sex: villagerInfo.sex,
      birthday: villagerInfo.birthday,
      personality: villagerInfo.personality,
      favoriteColor: villagerInfo.favoriteColor,
      speechHabit: villagerInfo.speechHabit,
      imageUrl: "",
    });

    const imageStorageRef = ref(storage, `${villagerInfo.engName}.jpg`);
    await uploadString(imageStorageRef, imageUrl, "data_url");

    const downloadURL = await getDownloadURL(imageStorageRef);
    await setDoc(villagerDocRef, { imageUrl: downloadURL }, { merge: true });

    alert(
      `${villagerInfo.name}이 성공적으로 목록에 등록되었습니다! 메인 화면으로 이동합니다.`
    );
    window.location.href = "/#";
  } catch (error) {
    console.error("주민 등록 오류:", error);
  }
};
