import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { type ExportModalProps } from "..";
import { v4 as uuid } from "uuid";
import { useUser } from "@clerk/nextjs";
import { validateGameSeries } from "@/utils/checkForDraft";
import { type GameSeries } from "@/store/types";
import { TbError404 } from "react-icons/tb";
import { api } from "@/trpc/react";
import { useAppContext } from "@/store/context";

interface ButtonStepMap {
  [key: number]: JSX.Element;
}

export function ExportModal({
  closeModal,
  label,
  errorMessage,
  setErrorMessage,
  successMessage,
  setSuccessMessage,
  setLink,
}: ExportModalProps) {
  const { mutateAsync, isLoading, isSuccess } = api.draft.export.useMutation();
  const [draftLink, setDraftLink] = useState("");
  const [draftString, setDraftString] = useState("");
  const { state } = useAppContext();
  const { draft: GameDraft } = state;
  const draftSlug = () => uuid().substring(12);
  const { user } = useUser();
  const isDraftValid = validateGameSeries(GameDraft);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setLoading(false);
    setSuccess(false);
    setStep(0);
    setErrorMessage("");
    setSuccessMessage("");
  }, [setErrorMessage, setStep, setSuccessMessage]);

  let user_id: string;
  let draft: GameSeries;

  async function onExportDraft() {
    if (!getErrorMessage()) return;
    setErrorMessage("");
    setSuccessMessage("");
    const link = `https://drafter.io/${draftSlug()}`;
    if (user) user_id = user.id;
    if (isDraftValid) draft = GameDraft;
    setStep(1);
    await mutateAsync(
      {
        draft,
        link,
        name: draftString,
        user_id,
      },
      {
        onError: (error) => {
          console.log(error);
        },
      },
    ).then((res) => {
      if (res && res?.data?.link) {
        setSuccessMessage("Successfuly Created!");
        setDraftLink(res.data.link);
        setLink(res.data.link);
        setStep(2);
      } else if (res.error) {
        setErrorMessage(res.error);
        setStep(0);
      }
    });
  }

  function getErrorMessage() {
    if (!isDraftValid) {
      setErrorMessage("Error: Incomplete Draft");
      console.log("Draft Invalido");
      return false;
    }
    if (draftString.length < 4) {
      setErrorMessage("Error: A Draft name must be at least 4 characters long");
      console.log("Nome muito curto");
      return false;
    }
    return true;
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draftLink);
      setSuccessMessage("Copied to cliboard!");
    } catch (err) {
      setErrorMessage("An error ocurred, please try again");
    }
  }

  useEffect(() => {
    setLoading(() => isLoading);
    setSuccess(() => isSuccess);
  }, [isLoading, isSuccess]);

  const buttonStepMap: ButtonStepMap = {
    0: (
      <p onClick={() => onExportDraft()} className="self-center">
        GO!
      </p>
    ),
    1: <FaSpinner className="h-6 w-6 animate-spin self-center" />,
    2: <FaCheck onClick={() => closeModal()} className="h-6 w-6 self-center" />,
  };

  return (
    <div
      id="modal-wrapper"
      className="mt-10 flex h-72 w-4/12 flex-col justify-between rounded-lg border-gray-700 bg-slate-400 p-8 font-bold text-gray-800 opacity-100"
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
          id="close-modal"
        >
          X
        </Dialog.Close>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="modal-input" id="input-label" className="text-white">
          Give your Draft a name:
        </label>
        <section className="flex gap-2">
          <div className="flex h-12 w-full flex-row items-center rounded-md bg-white p-4">
            <input
              className="w-[80%] bg-transparent p-2 font-mono font-normal outline-none"
              type="text"
              value={draftString}
              onChange={(e) => setDraftString(e.target.value)}
              id="modal-input"
            />
          </div>
          <div>
            {!errorMessage.trim().length ? (
              <button
                id="input-submit-button-success"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 font-bold text-white opacity-100 transition-colors hover:bg-green-600"
              >
                {buttonStepMap[step]}
              </button>
            ) : (
              <button
                id="input-submit-button-error"
                className="flex h-12 w-32 justify-center rounded-lg bg-red-500 font-bold text-white opacity-100 transition-colors hover:bg-red-600"
                onClick={() => {
                  onExportDraft();
                }}
              >
                <TbError404 className="h-6 w-6 self-center" />
              </button>
            )}
          </div>
        </section>

        <label
          htmlFor="link-output"
          id="link-output-label"
          className="text-white"
        >
          Link
        </label>
        <div className="flex w-full items-center justify-between gap-2">
          <div
            className="flex h-12 w-full cursor-pointer items-center rounded-md bg-white p-4 aria-disabled:cursor-not-allowed aria-disabled:border-2 aria-disabled:border-gray-500
             aria-disabled:bg-gray-400"
            aria-readonly
            onClick={async () => await handleCopy()}
            id="copy-link-button"
          >
            <BiLinkAlt size={18} className="mr-2 cursor-pointer" />
            <input
              className="w-full cursor-pointer bg-transparent p-2 font-mono font-normal outline-none"
              type="text"
              placeholder="Your link will appear here"
              value={draftLink}
              readOnly
              id="link-output"
            />
          </div>
        </div>
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
