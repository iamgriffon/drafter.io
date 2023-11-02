import * as Dialog from "@radix-ui/react-dialog";
import { ImCross } from "react-icons/im";
import { type ConfirmModalProps } from "..";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/trpc/react";

export function ConfirmModal({
  closeModal,
  label,
  link,
  name,
  onAccept,
  step,
  setStep,
  errorMessage,
  setErrorMessage,
  successMessage,
  setSuccessMessage,
}: ConfirmModalProps) {
  useEffect(() => {
    setStep(0);
    setErrorMessage("");
    setSuccessMessage("");
  }, [setErrorMessage, setStep, setSuccessMessage]);

  const { mutate, data } = api.draft.checkOwner.useMutation();
  const user = useUser();
  const { user: userProps } = user;

  function handleClick() {
    setStep(1);
    onAccept(() => {
      switch (label) {
        case "Delete":
          setSuccessMessage("Successfully Deleted!");
          break;
        case "Save":
          if (!userProps) return;
          mutate(
            {
              link: link,
              user_id: userProps.id,
            },
            {
              onSuccess: () => {
                if (data !== undefined) {
                  if (data.success === false) {
                    setErrorMessage(data.message);
                  } else if (data.success === true) {
                    setSuccessMessage(data.message);
                    setStep(2);
                  }
                }
              },
            },
          );
          break;
        case "Confirm":
        case "Reset":
          break;
        default:
          break;
      }

      setTimeout(() => {
        setStep(2);
        closeModal();
      }, 200);
    });
  }

  interface ButtonStepMap {
    [key: number]: JSX.Element;
  }

  const buttonStepMap: ButtonStepMap = {
    0: (
      <FaCheck onClick={() => handleClick()} className="h-6 w-6 self-center" />
    ),
    1: <FaSpinner className="h-6 w-6 animate-spin self-center" />,
    2: <FaCheck onClick={() => closeModal()} className="h-6 w-6 self-center" />,
  };

  const ModalLabel = () => {
    switch (label) {
      case "Confirm":
        return "Import Draft";
      default:
        return `${label} Draft`;
    }
  };

  return (
    <div
      id="modal-wrapper"
      className="mt-10 flex h-56 w-1/4 flex-col justify-between rounded-lg border-gray-700 bg-slate-400 p-8 font-bold text-gray-800 opacity-100"
    >
      <div className="flex items-start justify-between">
        <div className="mb-4 flex flex-col text-lg text-white shadow-black drop-shadow-lg">
          {ModalLabel()}
          {label !== "Reset" && <p className="font-thin">{name}</p>}
        </div>
        <Dialog.Close
          className="text-2xl font-bold text-white"
          onClick={() => closeModal()}
          id="close-modal"
        >
          X
        </Dialog.Close>
      </div>
      <div>
        <p id="modal-confirmation-text" className="text-white">
          Are you sure about that?
        </p>
        <div className="mt-6 flex w-full items-center justify-between gap-2">
          <button
            id="confirm-button"
            className="flex h-12 w-32 justify-center rounded-lg bg-green-500 font-bold text-white opacity-100 transition-colors hover:bg-green-600"
          >
            {buttonStepMap[step]}
          </button>
          <button className="flex h-12 w-32 justify-center rounded-lg bg-red-500 font-bold text-white opacity-100 transition-colors hover:bg-red-800">
            <ImCross
              onClick={() => closeModal()}
              className="h-6 w-6 self-center"
              id="close-modal"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {successMessage.trim().length > 0 ? (
          <p id="modal-success-msg" className="mt-1 text-green-200">
            {successMessage}
          </p>
        ) : null}
        {errorMessage.trim().length > 0 ? (
          <p id="modal-error-msg" className="mt-1 text-red-200">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
