import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { RenameModalProps } from "..";
import { useUser } from "@clerk/nextjs";
import { GameSeries } from "@/store/types";
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
  id
}: RenameModalProps) {
  const { mutateAsync, isLoading, isSuccess } =
    api.draft.update.useMutation();
  const { state, dispatch } = useAppContext();
  const { user } = useUser();
  const currentDraft = state.menu.drafts.find(draft => draft.id === id)?.data!
  const isDraftValid = validateGameSeries(currentDraft as GameSeries);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setLoading(false);
    setSuccess(false);
    setStep(0);
    setErrorMessage("");
    setSuccessMessage("");
  }, []);

  let user_id: string = '';
  let draft = state.menu.drafts.find(draft => draft.id === id)?.data! as GameSeries;

  const onRenameDraft = async () => {
    if (!getErrorMessage()) return;
    setErrorMessage("");
    setSuccessMessage("");
    if (user) user_id = user.id;
    setStep(1);
    await mutateAsync({
      draft: draft,
      link: link,
      name: name
    }, {
      onError: (error) => {
        console.log(error);
      }
    }).then((res) => {
      if (res && res?.success === true) {
        setSuccessMessage("Successfuly Renamed!");
        setStep(2);
      } else if (!res.success) {
        setErrorMessage(res.message);
        setStep(0);
      }
    });
  }

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
      <p
        onClick={() => onRenameDraft()}
        className="self-center"
      >
        GO!
      </p>
    ),
    1: <FaSpinner className="animate-spin self-center w-6 h-6" />,
    2: (
      <FaCheck
        onClick={() => closeModal()}
        className="w-6 h-6 self-center"
      />
    ),
  };

  return (
    <div className="flex font-bold text-gray-800 mt-10 bg-slate-400 w-4/12 opacity-100 rounded-lg h-48 flex-col justify-between border-gray-700 p-8">
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

      <div className="flex flex-col gap-2">
        <p className="text-white">Give your draft a new name:</p>
        <section className="flex gap-2">
          <div className="p-4 h-12 rounded-md w-full flex flex-row items-center bg-white">
            <input
              className="p-2 font-mono font-normal w-[80%] outline-none bg-transparent"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {!errorMessage.trim().length ? (
              <button className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors">
                {buttonStepMap[step]}
              </button>
            ) : (
              <button
                className="w-32 h-12 rounded-lg flex justify-center bg-red-500 opacity-100 font-bold text-white hover:bg-red-600 transition-colors"
                onClick={() => {
                  onRenameDraft();
                }}
              >
                <TbError404 className="w-6 h-6 self-center" />
              </button>
            )}
          </div>
        </section>
        {errorMessage.trim().length > 0 ? (
          <p className="text-red-400">{"*" + errorMessage}</p>
        ) : null}
        {successMessage.trim().length > 0 ? (
          <p className="text-green-400">{successMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
