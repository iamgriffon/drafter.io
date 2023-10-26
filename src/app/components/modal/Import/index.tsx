import { type ChangeEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiLinkAlt } from "react-icons/bi";
import { type ImportModalProps } from "..";
import { FaSpinner, FaCheck } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
import { api } from "@/trpc/react";
import { useAppContext } from "@/store/context";
import { updateDraftID } from "@/store/draft/actions";
import { GameSeries, Series } from "@/store/types";
import { selectGame, updateMenuSeries } from "@/store/menu/actions";

interface ButtonStepMap {
  [key: number]: JSX.Element;
}

export function ImportModal({
  closeModal,
  label,
  onSubmit: importDraft,
  link,
  setLink,
  step,
  setStep,
  errorMessage,
  setErrorMessage,
}: ImportModalProps) {

  useEffect(() => {
    setStep(0);
    setErrorMessage("");
  },[setErrorMessage, setStep]);

  const [draftLink, setDraftLink] = useState(link);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useAppContext();
  const { isLoading, isSuccess, refetch } = api.draft.import.useQuery(
    {
      link: draftLink,
    },
    {
      enabled: false,
      refetchOnMount: false,
    }
  );
  const hasError = errorMessage.trim().length && !isLoading;

  useEffect(() => {
    setLoading(() => isLoading);
    setSuccess(() => isSuccess);
  }, [isLoading, isSuccess]);

  useEffect(() => {
    setLoading(false);
    setSuccess(false);
    setStep(0);
    setErrorMessage("");
  }, [setErrorMessage, setStep]);

  async function onImportDraft() {
    setErrorMessage("");
    setStep(1);
    if (!draftLink.includes("https://")) {
      setDraftLink((prevState) => `https://drafter.io/${prevState}`);
    };

    return await refetch().then((res) => {
      if (res.data?.data?.data) {
        const parsedData = JSON.parse(JSON.stringify(res.data?.data.data));
        dispatch({type: 'draft', action: updateDraftID(res.data.data.id)});
        setLink(res.data.data.link);
        res.data.data.data && typeof parsedData.series === "string" && dispatch({type: 'menu', action: updateMenuSeries(parsedData.series as Series)});
        importDraft(parsedData as GameSeries);
        setStep(2);
        dispatch({type: 'menu', action: selectGame(1)});
        setTimeout(() => {
          closeModal();
        }, 200);
      } else if (res.data?.error) {
        setErrorMessage(res.data?.error);
        setStep(0);
      }
    });
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (hasError && !draftLink.trim().length) {
      setDraftLink("");
    } else {
      setDraftLink(event.target.value);
    }
  }

  const buttonStepMap: ButtonStepMap  = {
    0:  <p onClick={onImportDraft} className="self-center">GO!</p>,
    1: <FaSpinner className="animate-spin self-center w-6 h-6" />,
    2: <FaCheck onClick={closeModal} className="w-6 h-6 self-center" />
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
        <p className="text-white">Enter your link below</p>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="p-4 h-12 rounded-md w-full flex items-center bg-white">
            <BiLinkAlt
              size={18}
              className="mr-2"
            />
            <input
              className="p-2 font-mono text-sm font-normal w-full outline-none bg-transparent"
              type="text"
              value={draftLink}
              onChange={(e) => onChange(e)}
            />
          </div>
          {!errorMessage.trim().length ? (
            <button
              className="w-32 h-12 rounded-lg flex justify-center bg-green-500 opacity-100 font-bold text-white hover:bg-green-600 transition-colors"
            >
              { buttonStepMap[step] }
            </button>
          ) : (
            <button
              className="w-32 h-12 rounded-lg flex justify-center bg-red-500 opacity-100 font-bold text-white hover:bg-red-600 transition-colors"
              onClick={() => {
                onImportDraft();
              }}
            >
              <TbError404 className="w-6 h-6 self-center" />
            </button>
          )}
        </div>
      </div>
      {errorMessage.trim().length ? (
        <p className="text-red-500 mt-1">* {errorMessage}</p>
      ) : null}
    </div>
  );
}
