import {
  ChartBarIcon,
  CalendarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

import Picker from "@emoji-mart/react";
// Picker = new Picker;
import React, { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";


const Input = () => {
  const [input, SetInput] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const filePicker = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession()

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(
      collection(db, "posts"), {
        id: session.user.uid,
        username: session.user.name,
        userImg: session.user.image,
        tag: session.user.tag,
        text: input,
        timestamp: serverTimestamp(),
      });
    

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(
        ( async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          });
        })
      );
    }

    setLoading(false);
    SetInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    SetInput(input + emoji);
  };

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 ${loading && "opacity-60"}`}>
      <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer overflow-y-scroll"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile} && "pb-7" ${input} && "space-y-2.5"`}>
          <textarea
            value={input}
            onChange={(e) => SetInput(e.target.value)}
            rows="2"
            placeholder="What's happening"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer "
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className=" flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div className="icon" onClick={() => filePicker.current.click()}>
                <PhotographIcon className=" text-[#1d9bf0] h-[20px]" />
                <input
                  type="file"
                  hidden
                  onClick={addImageToPost}
                  ref={filePicker}
                />
              </div>
              <div className="icon ">
                <ChartBarIcon className="text-[#1d9bf0] h-[19.5px]" />
              </div>
              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[20px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[20px]" />
              </div>

              {showEmojis && (
                <Picker
                  // data={data}
                  onEmojiSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
