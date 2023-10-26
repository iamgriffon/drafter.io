import { GameSeries } from "@/store/types";
import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { OperationsMapEnum } from "../navbar";
import { ConfirmModal } from "./Confirm";
import { ExportModal } from "./Export";
import { ImportModal } from "./Import";
import { RenameModal } from "./Rename";
import { ShareModal } from "./Share";

export interface ModalPageProps {
	open: boolean;
	name: string;
	closeModal: () => void;
	label: OperationsMapEnum;
	importDraft: (param: GameSeries) => void;
	link: string;
	setLink: Dispatch<SetStateAction<string>>;
  onUpdateDraft: (param: () => void) => void;
  onDeleteDraft: (param: () => void) => void;
  onCreateNew: (param: () => void) => void;
}

export interface ImportModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
	onSubmit: (param: GameSeries) => void;
	link: string;
  setLink: Dispatch<SetStateAction<string>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>; 
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export interface ExportModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
  setLink: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>> ;
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>> 
}

export interface ShareModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
	link: string;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>> 
}

export interface ConfirmModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
  link: string,
	name: string;
	onAccept: (param: () => void) => void;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>> ;
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>> 
}

export interface RenameModalProps {
	closeModal: () => void;
	label: OperationsMapEnum;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>> ;
  successMessage: string;
  setSuccessMessage: Dispatch<SetStateAction<string>> ;
  link: string;
}


export function Modal({
  closeModal,
  label,
  importDraft,
  link = "",
  setLink,
  name,
  onDeleteDraft,
  onUpdateDraft,
  onCreateNew
}: ModalPageProps) {

  const [step, setStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ModalMap = {
    Import: (
      <ImportModal
        closeModal={closeModal}
        label={label}
        onSubmit={importDraft}
        link={link}
        setLink={setLink}
        step={step}
        setStep={setStep}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    ),
    Export: (
      <ExportModal
        closeModal={closeModal}
        label={label}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        setLink={setLink}
      />
    ),
    Share: (
      <ShareModal
        closeModal={closeModal}
        label={label}
        link={link}
        step={step}
        setStep={setStep}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
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
        setStep={setStep}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
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
        setStep={setStep}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
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
        setStep={setStep}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
    ),
    Rename: (
      <RenameModal
        closeModal={closeModal}
        label={label}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        link={link}
      />
    )
  };

  return (
    <Dialog.Content className="w-full h-full bg-slate-700 bg-opacity-90 z-10  flex flex-col items-center content-center fixed">
      {ModalMap[label]}
    </Dialog.Content>
  );
}
