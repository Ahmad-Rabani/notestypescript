import {
  HeadDiv,
  Notes,
  AllAndStared,
  Button,
  AddNotes,
  CardsDiv,
} from "./MainStylled";
import Model from "@/common_componenets/model/Model";
import Card from "@/common_componenets/card/Card";
import { useCallback, useEffect, useState } from "react";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useRouter } from "next/router";
import Loader from "@/common_componenets/loaders/Loaders";
import { DocumentData } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Main = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [currentId, setId] = useState<string>("");
  const [isCreateModel, setModel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUserUid, setUcurrentUserUid] = useState<string>("");

  const router = useRouter();
  const isStared: boolean = Boolean(router.query.stared);

  const handleCardData = useCallback(async (uid: string) => {
    const q = isStared
      ? query(
          collection(db, "newData"),
          where("userId", "==", uid),
          where("stared", "==", true)
        )
      : query(collection(db, "newData"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const dataOfFirebase = querySnapshot.docs;
    const storeUserData: DocumentData[] = dataOfFirebase.map((doc) => doc.data());
    setData(storeUserData);
    setIsLoading(false);
  },[isStared]);

  const closeFnc = async (id: string) => {
    await deleteDoc(doc(db, "newData", id));
    handleCardData(currentUserUid);
  };

  const updateData = (id: string) => {
    setModel(true);
    setId(id);
  };

  function closeModel(bol: boolean) {
    setModel(bol);
  }

  function showAllCards() {
    router.replace({ query: {} });
    handleCardData(currentUserUid);
  }

  function showStaredCards() {
    const newIsStared = !isStared;
    router.replace({ query: { stared: newIsStared ? "true" : undefined } });

    setIsLoading(true);
    handleCardData(currentUserUid);
  }

  function logOut() {
    router.push("/login");
    signOut(auth).then(() => {
      alert("Signed Out")
    }).catch((error) => {
      console.log("found",error)
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUcurrentUserUid(user.uid);
        setIsLoading(true);
        handleCardData(user.uid);
      }
    });
  }, [isStared,handleCardData]);

  return (
    <div>
      <HeadDiv>
        <Notes>
          Notes
        </Notes>
        <AllAndStared>
          <Button $primary="primary" $isclicked={!isStared} onClick={showAllCards}>
            All
          </Button>
          <Button
            name="allStaredButton"
            $secondry="secondry"
            onClick={showStaredCards}
            type="button"
            $isclicked={isStared}
          >
            Only Stared
          </Button>
          <Button $outline="outline" $isclicked={false} onClick={logOut}>
            Log Out
          </Button>
        </AllAndStared>
      </HeadDiv>
      <br />

      {isCreateModel && (
        <Model
          handleCardData={handleCardData}
          updatingData={data.find((item) => item.id === currentId)}
          showModel={closeModel}
          userUid={currentUserUid}
        />
      )}

      <CardsDiv>
        {isLoading ? (
          <Loader />
        ) : (
          data.map((item) => (
            <Card
              key={item.id}
              data={item}
              handleClose={closeFnc}
              handleUpdate={updateData}
              handleCardData={handleCardData}
              userUid={currentUserUid}
            />
          ))
        )}
      </CardsDiv>

      <AddNotes>
        <h2>Add Notes </h2>
        <span onClick={() => setModel(true)}>
          <h1>+</h1>
        </span>
      </AddNotes>
    </div>
  );
};

export default Main;
