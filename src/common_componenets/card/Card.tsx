import React, { useRef, useState } from "react";
import {
  Cards,
  CardName,
  CardDescription,
  CardDate,
  CloseIcon,
  EditIcon,
  StarIcon,
} from "./CardStylled";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SmLoader } from "../loaders/Loaders";
import { DocumentData } from "firebase/firestore";
import { ThemeProvider } from "styled-components";

interface CardProps{
  data: DocumentData[0];
  handleClose: (id:string) => void;
  handleUpdate: (id: string) => void;
  handleCardData: (data:any) => void;
  userUid?: string;
}

const Card = ({ data, handleClose, handleUpdate, handleCardData, userUid }: CardProps) => {
  const refStar = useRef<HTMLDivElement>(null);
  const refCard = useRef<HTMLDivElement>(null);
  const [isBtnLoader, setBtnLoader] = useState(false);
 
  function handleCloseButton(id: string) {
    handleClose(id);
  }

  function updateFnc(id: string) {
    return handleUpdate(id);
  }

  async function starFnc(id: string) {
    const docRef = doc(db, "newData", id);
    const docSnap = await getDoc(docRef);

    setBtnLoader(true);
    let dataStore = docSnap.data();

    const newDocRef = doc(db, "newData", id);
    if(dataStore){
    await setDoc(newDocRef, {
      id: dataStore.id,
      userId: userUid,
      name: dataStore.name,
      description: dataStore.description,
      date: dataStore.date,
      stared: !dataStore.stared,
    }).then(() => {
      handleCardData(userUid);
      setBtnLoader(false);
    })
  }}

  return (
    <>
      <Cards ref={refCard} key={data.id} draggable>
        <CardName>{data.name}</CardName>
        <CardDescription>{data.description}</CardDescription>
        <CardDate>{data.date}</CardDate>
        <CloseIcon
          className="material-symbols-outlined"
          onClick={() => handleCloseButton(data.id)}
        >
          close
        </CloseIcon>
        <EditIcon
          className="material-symbols-outlined"
          onClick={() => updateFnc(data.id)}
        >
          edit
        </EditIcon>
        <ThemeProvider theme={{color : "yellow"}}>
        <StarIcon
          ref={refStar}
          $stared={data.stared}
          onClick={() => starFnc(data.id)}
          className="material-symbols-outlined"
        >
          {isBtnLoader && <SmLoader />}
          {!isBtnLoader && "star"}
        </StarIcon>
        </ThemeProvider>
      </Cards>
    </>
  );
};

export default React.memo(Card);
