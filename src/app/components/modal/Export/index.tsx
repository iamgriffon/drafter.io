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
  setLink
}: ExportModalProps) {
  const { mutateAsync, isLoading, isSuccess } =
		api.draft.export.useMutation();
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
    await mutateAsync({
      draft,
      link,
      name: draftString,
      user_id,
    }, {
      onError: (error) => {
        console.log(error);
      }
    }).then((res) => {
      if (res && res?.data?.link) {
        setSuccessMessage("Successfuly Created!");
        setDraftLink(res.data.link);
        setLink(res.data.link);
        setStep(2);
      } else if (res.error){
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
      <p
        onClick={() => onExportDraft()}
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
    <div className="flex font-bold text-gray-800 mt-10 bg-slate-400 w-4/12 opacity-100 rounded-lg h-72 flex-col justify-between border-gray-700 p-8">
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
        <p className="text-white">Give your Draft a name:</p>
        <section className="flex gap-2">
          <div className="p-4 h-12 rounded-md w-full flex flex-row items-center bg-white">
            <input
              className="p-2 font-mono font-normal w-[80%] outline-none bg-transparent"
              type="text"
              value={draftString}
              onChange={(e) => setDraftString(e.target.value)}
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
                  onExportDraft();
                }}
              >
                <TbError404 className="w-6 h-6 self-center" />
              </button>
            )}
          </div>
        </section>

        <p className="text-white">Link</p>
        <div className="flex w-full items-center justify-between gap-2">
          <div
            className="p-4 h-12 rounded-md w-full flex items-center bg-white aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed aria-disabled:border-gray-500 aria-disabled:border-2
             cursor-pointer"
            aria-readonly
            onClick={async () => await handleCopy()}
          >
            <BiLinkAlt
              size={18}
              className="mr-2 cursor-pointer"
            />
            <input
              className="p-2 font-mono font-normal w-full outline-none bg-transparent cursor-pointer"
              type="text"
              placeholder="Your link will appear here"
              value={draftLink}
              readOnly
            />
          </div>
        </div>
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
