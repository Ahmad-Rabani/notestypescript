import React, { useRef } from "react";
import { OuterDiv, Form, InputsDiv, ButtonDiv, Button } from "./ModelStylled";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { DocumentData } from "firebase/firestore";

interface MainProps {
  updatingData: DocumentData[0];
  showModel: (type: boolean) => void;
  handleCardData: (updatingData: DocumentData[0]) => void;
  userUid?: string;
}

type FormValues = {
  title: HTMLInputElement;
  desc: HTMLInputElement;
  date: HTMLInputElement;
};

const Model = ({
  updatingData,
  showModel,
  handleCardData,
  userUid,
}: MainProps) => {
  const refName = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLTextAreaElement>(null);
  const refDate = useRef<HTMLInputElement>(null);
  const saveButton = useRef<HTMLButtonElement>(null);
  const refWord = useRef<HTMLDivElement>(null);
  const refouterDiv = useRef<HTMLDivElement>(null);

  function backFnc() {
    showModel(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { title, desc, date } = e.currentTarget as unknown as FormValues;

    if (updatingData) {
      showModel(false);
      const newDocRef = doc(db, "newData", updatingData.id);
      await setDoc(newDocRef, {
        id: updatingData.id,
        userId: userUid,
        name: title.value,
        description: desc.value,
        date: date.value,
        stared: false,
      });
      title.value = "";
      desc.value = "";
      date.value = "";
    } else {
      showModel(false);
      const usersCollectionRef = collection(db, "newData");
      const { id } = await addDoc(usersCollectionRef, {});
      const newDocRef = doc(usersCollectionRef, id);
      await setDoc(newDocRef, {
        id: id,
        userId: userUid,
        name: title.value,
        description: desc.value,
        date: date.value,
        stared: false,
      });
    }

    title.value = "";
    desc.value = "";
    date.value = "";
    handleCardData(userUid);
  }

  function wordsEntered(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const content = e.target.value.trim();
    let wordList = content.split(/\s+/);
    const nonEmptyWords = wordList.filter((word) => word !== "");
    if (refWord.current) {
      refWord.current.textContent = nonEmptyWords.length.toString();
    }
  }

  window.addEventListener("mouseup", function (event) {
    if (event.target === refouterDiv.current) {
      showModel(false);
    }
  });

  return (
    <OuterDiv ref={refouterDiv}>
      <InputsDiv>
        <h1>Add Note</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <h2>Name</h2>
            <input
              ref={refName}
              defaultValue={updatingData?.name ?? ""}
              name="title"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <br />

          <div>
            <h2>Description</h2>
            <textarea
              defaultValue={updatingData?.description ?? ""}
              onChange={wordsEntered}
              ref={refDescription}
              name="desc"
              placeholder="Explain More"
              maxLength={300}
              required
            ></textarea>
            <p>
              <span ref={refWord} id="word"></span> Words
            </p>
          </div>
          <br />

          <div>
            <h2>Date</h2>
            <input
              defaultValue={updatingData?.date ?? ""}
              ref={refDate}
              name="date"
              type="date"
              placeholder="mm/dd/yyyy"
              required
            />
          </div>
          <br />

          <ButtonDiv>
            <Button
              $secondry=""
              $primary="primary"
              type="button"
              onClick={backFnc}
            >
              Back
            </Button>
            <Button ref={saveButton} $secondry="secondry" $primary="">
              Save
            </Button>
          </ButtonDiv>
        </Form>
      </InputsDiv>
    </OuterDiv>
  );
};

export default React.memo(Model);