import { type GameSeries } from "@/store/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useCallback } from "react";
import { type OperationsMapEnum } from "../navbar";
import { ConfirmModal } from "./Confirm";
import { ExportModal } from "./Export";
import { ImportModal } from "./Import";
import { RenameModal } from "./Rename";
import { ShareModal } from "./Share";

export interface ModalPageProps {
  open: boolean;
  name: string;
  setName: (param: string) => void;
  closeModal: () => void;
  label: OperationsMapEnum;
  importDraft: (param: GameSeries) => void;
  link: string;
  setLink: (param: string) => void;
  onUpdateDraft: (param: () => void) => void;
  onDeleteDraft: (param: () => void) => void;
  onCreateNew: (param: () => void) => void;
  id: string;
}

export interface ImportModalProps {
  closeModal: () => void;
  label: OperationsMapEnum;
  importDraft: (param: GameSeries) => void;
  link: string;
  setLink: (param: string) => void;
  step: number;
  setStep: (param: number) => void;
  errorMessage: string;
  setErrorMessage: (param: string) => void;
}

export interface ExportModalProps {
  closeModal: () => void;
  label: OperationsMapEnum;
  setLink: (param: string) => void;
  errorMessage: string;
  setErrorMessage: (param: string) => void;
  successMessage: string;
  setSuccessMessage: (param: string) => void;
}

export interface ShareModalProps {
  closeModal: () => void;
  label: OperationsMapEnum;
  link: string;
  step: number;
  setStep: (param: number) => void;
  successMessage: string;
  setSuccessMessage: (param: string) => void;
}

export interface ConfirmModalProps {
  closeModal: () => void;
  label: OperationsMapEnum;
  link: string;
  name: string;
  onAccept: (param: () => void) => void;
  step: number;
  setStep: (param: number) => void;
  errorMessage: string;
  setErrorMessage: (param: string) => void;
  successMessage: string;
  setSuccessMessage: (param: string) => void;
}

export interface RenameModalProps {
  closeModal: () => void;
  label: OperationsMapEnum;
  errorMessage: string;
  setErrorMessage: (param: string) => void;
  successMessage: string;
  setSuccessMessage: (param: string) => void;
  link: string;
  name: string;
  setName: (param: string) => void;
  id: string;
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
  onCreateNew,
}: ModalPageProps) {
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateSuccessMessage = useCallback((message: string) => {
    setSuccessMessage(message);
  }, []);

  const updateStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const updateErrorMessage = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

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
    Update: (
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
    Create: (
      <ConfirmModal
        closeModal={closeModal}
        link={link}
        label={label}
        name={name}
        onAccept={onCreateNew}
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
