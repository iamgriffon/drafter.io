import { type ChangeEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiLinkAlt } from "react-icons/bi";
import { type ImportModalProps } from "..";
import { FaSpinner, FaCheck } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";
import { api } from "@/trpc/react";
import { useAppContext } from "@/store/context";
import { updateDraftID } from "@/store/draft/actions";
import { type GameSeries, type Series } from "@/store/types";
import { selectGame, updateMenuSeries } from "@/store/menu/actions";

interface ButtonStepMap {
  [key: number]: JSX.Element;
}

export function ImportModal({
  closeModal,
  label,
  importDraft,
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
  }, [setErrorMessage, setStep]);

  const [draftLink, setDraftLink] = useState("");
  const [_, setLoading] = useState(false);
  const [__, setSuccess] = useState(false);
  const { dispatch } = useAppContext();
  const { isLoading, isSuccess, refetch } = api.draft.import.useQuery(
    {
      link: draftLink,
    },
    {
      enabled: false,
      refetchOnMount: false,
    },
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
    }

    return await refetch().then((res) => {
      if (res.data?.data?.data) {
        const parsedData = JSON.parse(JSON.stringify(res.data?.data.data));
        dispatch({ type: "draft", action: updateDraftID(res.data.data.id) });
        setLink(res.data.data.link);
        res.data.data.data &&
          typeof parsedData.series === "string" &&
          dispatch({
            type: "menu",
            action: updateMenuSeries(parsedData.series as Series),
          });
        importDraft(parsedData as GameSeries);
        setStep(2);
        dispatch({ type: "menu", action: selectGame(1) });
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

  const buttonStepMap: ButtonStepMap = {
    0: (
      <p onClick={onImportDraft} className="self-center">
        GO!
      </p>
    ),
    1: <FaSpinner className="h-6 w-6 animate-spin self-center" />,
    2: <FaCheck onClick={closeModal} className="h-6 w-6 self-center" />,
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
          className="text-2xl font-bold text-white"
          onClick={() => closeModal()}
          id="close-modal"
        >
          X
        </Dialog.Close>
      </div>
      <div>
        <label htmlFor="modal-input" id="input-label" className="text-white">
          Enter your link below
        </label>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex h-12 w-full items-center rounded-md bg-white p-4">
            <BiLinkAlt size={18} className="mr-2" />
            <input
              className="w-full bg-transparent p-2 font-mono text-sm font-normal outline-none"
              type="text"
              value={draftLink}
              onChange={(e) => onChange(e)}
              id="modal-input"
            />
          </div>
          {!errorMessage.trim().length ? (
            <button
              className="flex h-12 w-32 justify-center rounded-lg bg-green-500 font-bold text-white opacity-100 transition-colors hover:bg-green-600"
              id="input-submit-button-success"
            >
              {buttonStepMap[step]}
            </button>
          ) : (
            <button
              id="input-submit-button-error"
              className="flex h-12 w-32 justify-center rounded-lg bg-red-500 font-bold text-white opacity-100 transition-colors hover:bg-red-600"
              onClick={() => {
                onImportDraft();
              }}
            >
              <TbError404 className="h-6 w-6 self-center" />
            </button>
          )}
        </div>
      </div>
      {errorMessage.trim().length ? (
        <p id="modal-error-msg" className="mt-1 text-red-500">
          * {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
