import * as Dialog from "@radix-ui/react-dialog";
import { BiLinkAlt } from "react-icons/bi";
import { type ShareModalProps } from "..";
import { FaCheck } from "react-icons/fa";
import { useEffect } from "react";
import { RiFileCopy2Fill } from "react-icons/ri";

interface ButtonStepMap {
  [key: number]: JSX.Element;
}

export function ShareModal({
  closeModal,
  label,
  link,
  step,
  setStep,
  successMessage,
  setSuccessMessage,
}: ShareModalProps) {

  useEffect(() => {
    setStep(0);
    setSuccessMessage("");
  }, []);


  const buttonStepMap: ButtonStepMap = {
    0: (
      <RiFileCopy2Fill
        onClick={() => {
          navigator.clipboard.writeText(link);
          setSuccessMessage("Link copied to the clipboard!");
          setStep(1);
        }}
        className="w-6 h-6 self-center"
      />
    ),
    1: (
      <FaCheck
        onClick={() => closeModal()}
        className="w-6 h-6 self-center"
      />
    ),
  };

  return (
    <div className="flex font-bold text-gray-800 mt-10 bg-slate-400 w-[45%] opacity-100 rounded-lg h-48 flex-col justify-between border-gray-700 p-8">
      <div className="flex justify-between items-start">
        <p className="text-white mb-4 drop-shadow-lg shadow-black text-lg">
          {label} Draft
        </p>
        <Dialog.Close
          className="font-bold text-white text-lg"
          onClick={() => closeModal()}
        >
          X
        </Dialog.Close>
      </div>
      <div>
        <p className="text-white">
          Click the button to copy the link to clipboard
        </p>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="p-4 h-12 rounded-md w-full flex items-center bg-white">
            <BiLinkAlt
              size={18}
              className="mr-2"
            />
            <input
              className="p-2 font-mono text-sm font-normal w-full outline-none bg-transparent"
              type="text"
              value={link}
              readOnly
            />
          </div>
          <button className="w-32 h-12 rounded-lg flex justify-center bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors">
            {buttonStepMap[step]}
          </button>
        </div>
      </div>
      {successMessage.trim().length > 0 ? (
        <p className="mt-2 text-green-300">{successMessage}</p>
      ) : null}
    </div>
  );
}
