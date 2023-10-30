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
  }, [setStep, setSuccessMessage]);

  const buttonStepMap: ButtonStepMap = {
    0: (
      <RiFileCopy2Fill
        onClick={() => {
          navigator.clipboard.writeText(link);
          setSuccessMessage("Link copied to the clipboard!");
          setStep(1);
        }}
        className="h-6 w-6 self-center"
      />
    ),
    1: <FaCheck onClick={() => closeModal()} className="h-6 w-6 self-center" />,
  };

  return (
    <div
      id="modal-wrapper"
      className="mt-10 flex h-48 w-[45%] flex-col justify-between rounded-lg border-gray-700 bg-slate-400 p-8 font-bold text-gray-800 opacity-100"
    >
      <div className="flex items-start justify-between">
        <p
          id="modal-label"
          className="mb-4 text-lg text-white shadow-black drop-shadow-lg"
        >
          {label} Draft
        </p>
        <Dialog.Close
          className="text-lg font-bold text-white"
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
          <div className="flex h-12 w-full items-center rounded-md bg-white p-4">
            <BiLinkAlt size={18} className="mr-2" />
            <input
              className="w-full bg-transparent p-2 font-mono text-sm font-normal outline-none"
              type="text"
              value={link}
              readOnly
            />
          </div>
          <button
            id=""
            className="flex h-12 w-32 justify-center rounded-lg bg-green-500 font-bold text-white opacity-100 transition-colors hover:bg-green-600"
          >
            {buttonStepMap[step]}
          </button>
        </div>
      </div>
      {successMessage.trim().length > 0 ? (
        <p id="modal-success-msg" className="mt-2 text-green-300">
          {successMessage}
        </p>
      ) : null}
    </div>
  );
}
