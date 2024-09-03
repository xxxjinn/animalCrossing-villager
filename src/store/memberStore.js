import { db, storage } from "../firebase";
import {
  getDocs,
  getDoc,
  collection,
  doc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

/** 전체 주민 데이터 가져오기 */
export const fetchDataFromFirestore = async (
  lastDoc = null,
  limitNumber = 4
) => {
  try {
    const villagerCollection = collection(db, "villager");
    const villagerQuery = lastDoc
      ? query(
          villagerCollection,
          orderBy("engName"),
          startAfter(lastDoc),
          limit(limitNumber)
        )
      : query(villagerCollection, orderBy("engName"), limit(limitNumber));

    const querySnapshot = await getDocs(villagerQuery);
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

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { villagerData, lastVisible };
  } catch (error) {
    console.error(error);
  }
};

/** 주민 한 명의 데이터만 가져오기 */
export const fetchOneVillagerData = async (villagerId) => {
  try {
    const docRef = doc(db, "villager", villagerId);
    const querySnapshot = await getDoc(docRef);
    const villagerData = [];

    const data = querySnapshot.data();
    villagerData.push({
      name: data.name,
      id: data.engName,
      engName: data.engName,
      favoriteColor: data.favoriteColor,
      imageUrl: data.imageUrl,
      sex: data.sex,
      birthday: data.birthday,
      personality: data.personality,
      speechHabit: data.speechHabit,
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
      `${villagerInfo.name}이(가) 성공적으로 목록에 등록되었습니다! 메인 화면으로 이동합니다.`
    );
    window.location.href = "/#";
  } catch (error) {
    console.error("주민 등록 오류:", error);
  }
};
