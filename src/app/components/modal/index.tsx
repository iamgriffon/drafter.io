import { useAppContext } from "@/store/context";
import { updateDraftID } from "@/store/draft/actions";
import { selectGame, updateMenuSeries } from "@/store/menu/actions";
import { type Series, type GameSeries } from "@/store/types";
import { api } from "@/trpc/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useCallback } from "react";
import { type OperationsMapEnum } from "../navbar";
import { ConfirmModal } from "./Confirm";
import { ExportModal } from "./Export";
import { ImportModal } from "./Import";
import { RenameModal } from "./Rename";
import { ShareModal } from "./Share";

export interface BaseModalProps {
  closeModal: () => void;
  label: OperationsMapEnum;
}

interface Errors {
  errorMessage: string;
  setErrorMessage: (param: string) => void;
}

interface Success {
  successMessage: string;
  setSuccessMessage: (param: string) => void;
}

interface Messages extends Errors, Success {}

export interface ModalPageProps extends BaseModalProps {
  open: boolean;
  name: string;
  setName: (param: string) => void;
  link: string;
  importDraft: (param: GameSeries) => void;
  setLink: (param: string) => void;
  onUpdateDraft: (param: () => void) => void;
  onDeleteDraft: (param: () => void) => void;
  onResetDraft: (param: () => void) => void;
  id: string;
}

export interface ImportModalProps extends BaseModalProps, Errors {
  importDraft: (param: GameSeries) => void;
  setLink: (param: string) => void;
  step: number;
  setStep: (param: number) => void;
  link: string;
}

export interface ExportModalProps extends BaseModalProps, Messages {
  setLink: (param: string) => void;
}

export interface ShareModalProps extends BaseModalProps, Success {
  link: string;
  step: number;
  setStep: (param: number) => void;
}

export interface ConfirmModalProps extends BaseModalProps, Messages {
  name: string;
  onAccept: (param: () => void) => void;
  step: number;
  setStep: (param: number) => void;
  link: string;
}

export interface RenameModalProps extends BaseModalProps, Messages {
  name: string;
  setName: (param: string) => void;
  id: string;
  link: string;
}

export function Modal({
  closeModal,
  label,
  importDraft,
  link = "",
  setLink,
  name,
  id,
  setName,
  onDeleteDraft,
  onUpdateDraft,
  onResetDraft,
}: ModalPageProps) {
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { refetch } = api.draft.import.useQuery(
    {
      link: link,
    },
    {
      enabled: false,
      refetchOnMount: false,
    },
  );

  const { dispatch } = useAppContext();

  const updateSuccessMessage = useCallback((message: string) => {
    setSuccessMessage(message);
  }, []);

  const updateStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const updateErrorMessage = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

  const onImportDraft = useCallback(async () => {
    let draftLink = link;
    setErrorMessage("");
    setStep(1);
    if (!draftLink.includes("https://")) {
      draftLink = `https://drafter.io/${link}`;
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
  }, [closeModal, importDraft, link, refetch, dispatch, setLink]);

  const ModalMap = {
    Import: (
      <ImportModal
        closeModal={closeModal}
        label={label}
        importDraft={importDraft}
        link={link}
        setLink={setLink}
        step={step}
        setStep={updateStep}
        errorMessage={errorMessage}
        setErrorMessage={updateErrorMessage}
      />
    ),
    Export: (
      <ExportModal
        closeModal={closeModal}
        label={label}
        errorMessage={errorMessage}
        setErrorMessage={updateErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={updateSuccessMessage}
        setLink={setLink}
      />
    ),
    Share: (
      <ShareModal
        closeModal={closeModal}
        label={label}
        link={link}
        step={step}
        setStep={updateStep}
        successMessage={successMessage}
        setSuccessMessage={updateSuccessMessage}
      />
    ),
    Delete: (
      <ConfirmModal
        closeModal={closeModal}
        link={link}
        name={name}
        label={label}
        onAccept={onDeleteDraft}
        step={step}
        setStep={updateStep}
        errorMessage={errorMessage}
        setErrorMessage={updateErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={updateSuccessMessage}
      />
    ),
    Save: (
      <ConfirmModal
        closeModal={closeModal}
        link={link}
        label={label}
        name={name}
        onAccept={onUpdateDraft}
        step={step}
        setStep={updateStep}
        errorMessage={errorMessage}
        setErrorMessage={updateErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={updateSuccessMessage}
      />
    ),
    Reset: (
      <ConfirmModal
        closeModal={closeModal}
        link={link}
        label={label}
        name={name}
        onAccept={onResetDraft}
        step={step}
        setStep={updateStep}
        errorMessage={errorMessage}
        setErrorMessage={updateErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={updateSuccessMessage}
      />
    ),
    Rename: (
      <RenameModal
        closeModal={closeModal}
        label={label}
        errorMessage={errorMessage}
        setErrorMessage={updateErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={updateSuccessMessage}
        link={link}
        name={name}
        setName={setName}
        id={id}
      />
    ),
    Confirm: (
      <ConfirmModal
        closeModal={closeModal}
        link={link}
        label={label}
        name={name}
        onAccept={onImportDraft}
        step={step}
        setStep={updateStep}
        errorMessage={errorMessage}
        setErrorMessage={updateErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={updateSuccessMessage}
      />
    ),
  };

  return (
    <Dialog.Content
      id="modal-content"
      className="fixed z-10 flex h-full w-full  flex-col content-center items-center bg-slate-700 bg-opacity-90"
    >
      {ModalMap[label]}
    </Dialog.Content>
  );
}
