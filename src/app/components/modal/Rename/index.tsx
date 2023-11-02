import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useState } from "react";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { type RenameModalProps } from "..";
import { useUser } from "@clerk/nextjs";
import { type GameSeries } from "@/store/types";
import { TbError404 } from "react-icons/tb";
import { api } from "@/trpc/react";
import { useAppContext } from "@/store/context";
import { validateGameSeries } from "@/utils/checkForDraft";

interface ButtonStepMap {
  [key: number]: JSX.Element;
}

export function RenameModal({
  closeModal,
  label,
  errorMessage,
  setErrorMessage,
  successMessage,
  setSuccessMessage,
  link,
  name,
  setName,
  id,
}: RenameModalProps) {
  const { mutateAsync, isLoading, isSuccess } = api.draft.update.useMutation();
  const { state, dispatch } = useAppContext();
  const { user } = useUser();
  const currentDraft = state.menu.drafts.find((draft) => draft.id === id)
    ?.data!;
  const isDraftValid = validateGameSeries(currentDraft as GameSeries);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const updateStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  useEffect(() => {
    setLoading(false);
    setSuccess(false);
    updateStep(0);
    setErrorMessage("");
    setSuccessMessage("");
  }, [setErrorMessage, updateStep, setSuccessMessage]);

  let user_id: string = "";
  let draft = state.menu.drafts.find((draft) => draft.id === id)
    ?.data! as GameSeries;

  const onRenameDraft = async () => {
    if (!getErrorMessage()) return;
    setErrorMessage("");
    setSuccessMessage("");
    if (user) user_id = user.id;
    setStep(1);
    await mutateAsync(
      {
        draft: draft,
        link: link,
        name: name,
      },
      {
        onError: (error) => {
          console.log(error);
        },
      },
    ).then((res) => {
      if (res && res?.success === true) {
        setSuccessMessage("Successfuly Renamed!");
        setStep(2);
      } else if (!res.success) {
        setErrorMessage(res.message);
        setStep(0);
      }
    });
  };

  function getErrorMessage() {
    if (!isDraftValid) {
      setErrorMessage("Error: Could not rename your draft");
      return false;
    }
    if (name.length < 4) {
      setErrorMessage("Error: A Draft name must be at least 4 characters long");
      return false;
    }
    return true;
  }

  useEffect(() => {
    setLoading(() => isLoading);
    setSuccess(() => isSuccess);
  }, [isLoading, isSuccess]);

  const buttonStepMap: ButtonStepMap = {
    0: (
      <p onClick={() => onRenameDraft()} className="self-center">
        GO!
      </p>
    ),
    1: <FaSpinner className="h-6 w-6 animate-spin self-center" />,
    2: <FaCheck onClick={() => closeModal()} className="h-6 w-6 self-center" />,
  };

  return (
    <div
      id="modal-wrapper"
      className="mt-10 flex h-48 w-4/12 flex-col justify-between rounded-lg border-gray-700 bg-slate-400 p-8 font-bold text-gray-800 opacity-100"
    >
      <div className="flex items-start justify-between">
        <p
          id="modal-label"
          className="mb-4 text-lg text-white shadow-black drop-shadow-lg"
        >
          {label} Draft
        </p>
        <Dialog.Close
          className="text-2xl font-bold text-white"
          onClick={() => closeModal()}
          id="close-modal"
        >
          X
        </Dialog.Close>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="modal-input" id="input-label" className="text-white">
          Give your Draft a new name:
        </label>
        <section className="flex gap-2">
          <div className="flex h-12 w-full flex-row items-center rounded-md bg-white p-4">
            <input
              className="w-[80%] bg-transparent p-2 font-mono font-normal outline-none"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="modal-input"
            />
          </div>
          <div>
            {!errorMessage.trim().length ? (
              <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 font-bold text-white opacity-100 transition-colors hover:bg-green-600">
                {buttonStepMap[step]}
              </button>
            ) : (
              <button
                className="flex h-12 w-32 justify-center rounded-lg bg-red-500 font-bold text-white opacity-100 transition-colors hover:bg-red-600"
                onClick={() => {
                  onRenameDraft();
                }}
              >
                <TbError404 className="h-6 w-6 self-center" />
              </button>
            )}
          </div>
        </section>
        {errorMessage.trim().length > 0 ? (
          <p id="modal-error-msg" className="text-red-400">
            {"*" + errorMessage}
          </p>
        ) : null}
        {successMessage.trim().length > 0 ? (
          <p id="modal-success-msg" className="text-green-400">
            {successMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
