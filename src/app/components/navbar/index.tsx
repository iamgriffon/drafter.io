import { useAppContext } from "@/store/context";
import { updateFullDraft } from "@/store/draft/actions";
import { storeDrafts, updateMenuSeries } from "@/store/menu/actions";
import { type GameSeries } from "@/store/types";
import { api } from "@/trpc/react";
import { validateGameSeries } from "@/utils/checkForDraft";
import { DEFAULT_BO1_STATE } from "@/utils/setDefaultValues";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import {
  BiChevronRight,
  BiExport,
  BiImport,
  BiPencil,
  BiTrash,
} from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { Modal } from "../modal";

export type OperationsMapEnum =
  | "Import"
  | "Export"
  | "Share"
  | "Delete"
  | "Save"
  | "Reset"
  | "Rename"
  | "Confirm";

export function NavBar() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [label, setLabel] = useState<OperationsMapEnum>("Import");
  const { user: userProps } = user;
  const { mutate: updateDraft } = api.draft.update.useMutation();
  const { mutate: deleteDraft } = api.draft.delete.useMutation();
  const { state, dispatch } = useAppContext();
  const { games } = state.draft;
  const { game, drafts } = state.menu;
  const { refetch } = api.draft.fetch.useQuery(
    {
      user_id: userProps?.id || "",
    },
    {
      enabled: true,
      refetchOnMount: true,
    },
  );

  const onDeleteDraft = useCallback(
    (callback: () => void) => {
      deleteDraft(
        {
          id: id,
          user_id: userProps!.id,
        },
        {
          onSettled: () => callback(),
        },
      );
    },
    [deleteDraft, id, userProps],
  );

  const onUpdateDraft = useCallback(
    (callback: () => void) => {
      updateDraft(
        {
          link: link,
          draft: state.draft,
          name: name,
        },
        {
          onSettled: () => callback(),
        },
      );
    },
    [state.draft, updateDraft, name, link],
  );

  const fetchDrafts = useCallback(async () => {
    const response = await refetch();
    if (response.data)
      dispatch({ type: "menu", action: storeDrafts(response.data) });
  }, [dispatch, refetch]);

  const onResetDraft = useCallback(
    (callback: () => void) => {
      dispatch({ type: "draft", action: updateFullDraft(DEFAULT_BO1_STATE) });
      dispatch({ type: "menu", action: updateMenuSeries("BO1") });
      setName("");
      setLink("");
      callback();
    },
    [dispatch],
  );

  function openModal(param: OperationsMapEnum, callback?: () => void) {
    if (callback) callback();
    setLabel(param);
    setOpen(true);
  }

  const selectedMatch = () => {
    return games[game - 1]!;
  };

  const importDraft = (param: GameSeries) => {
    dispatch({ type: "draft", action: updateFullDraft(param) });
    dispatch({ type: "menu", action: updateMenuSeries(param.series) });
  };

  const updated = () => {
    return {
      drafts: state.menu.drafts,
    };
  };

  useEffect(() => {
    fetchDrafts();
  }, [open, user.user?.id, fetchDrafts]);

  const updateLink = useCallback((link: string) => {
    setLink(link);
  }, []);

  const updateName = useCallback((name: string) => {
    setName(name);
  }, []);

  const DropdownStyle =
    "flex flex-row items-center justify-between text-gray-600 hover:text-gray-400";
  const NavItemStyle =
    "cursor-pointer font-bold text-gray-100 hover:text-gray-300 disabled:text-gray-500";

  return (
    <>
      <Dialog.Root defaultOpen={false} open={open}>
        <DropdownMenu.Root>
          <nav
            id="navbar"
            className="flex w-full max-w-[1440px] flex-row items-center justify-between self-center border-b-2 px-8 py-3"
          >
            <section className="flex flex-row gap-8">
              <button
                className={NavItemStyle}
                onClick={() => openModal("Import")}
              >
                {"Import"}
              </button>
              {!!user.isSignedIn && (
                <>
                  {!!user.isSignedIn &&
                  games.length > 0 &&
                  selectedMatch !== null ? (
                    <button
                      className="cursor-pointer font-bold   text-gray-100 hover:text-gray-300"
                      onClick={() => openModal("Export")}
                      id="export-draft-button"
                    >
                      {"Export"}
                    </button>
                  ) : null}
                  <button
                    onClick={() => openModal("Save")}
                    className={NavItemStyle}
                    id="update-draft-button"
                  >
                    {"Save"}
                  </button>
                  <button
                    onClick={() => openModal("Share")}
                    className={NavItemStyle}
                    disabled={!link.trim().length}
                    id="share-button-button"
                  >
                    {"Share"}
                  </button>
                  <button
                    className={NavItemStyle}
                    onClick={() => openModal("Rename")}
                    id="rename-draft-button"
                    disabled={!name.trim().length}
                  >
                    {"Rename"}
                  </button>
                  <button
                    className={NavItemStyle}
                    onClick={() => openModal("Reset")}
                    id="reset-draft-button"
                  >
                    {"Clear"}
                  </button>
                </>
              )}
            </section>
            <section className="flex flex-row gap-4">
              {!!user.isSignedIn && (
                <DropdownMenu.Trigger>
                  <p id="my-drafts" className="font-bold">
                    My Drafts
                  </p>
                </DropdownMenu.Trigger>
              )}
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={5}
                  className="z-10 mt-2 flex w-[10rem] cursor-pointer flex-col gap-1 rounded-md bg-white p-2 shadow-md"
                >
                  {updated().drafts.length > 0 ? (
                    updated().drafts?.map((draft, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col text-gray-600 hover:text-gray-400">
                          <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger className="flex flex-row items-center justify-between">
                              <p
                                id="draft-dropdown-selector"
                                className="w-[90%]  self-start p-2 text-gray-600"
                              >
                                {draft.name}
                              </p>
                              <BiChevronRight size={24} />
                            </DropdownMenu.SubTrigger>
                            <DropdownMenu.Portal>
                              <DropdownMenu.SubContent
                                className="z-10 flex w-24 cursor-pointer flex-col content-center justify-between gap-1 rounded-md bg-white p-1 px-2 shadow-md"
                                sideOffset={10}
                                alignOffset={5}
                                hideWhenDetached
                              >
                                <DropdownMenu.Item
                                  className={DropdownStyle}
                                  textValue="Import"
                                  onClick={() => {
                                    openModal("Confirm", () => {
                                      setLink(draft.link);
                                      setName(draft.name);
                                    });
                                  }}
                                  id="import-draft-submenu"
                                >
                                  Import
                                  <BiImport size={18} />
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="w-[80%] self-center border-t border-gray-300" />
                                <DropdownMenu.Item
                                  className={DropdownStyle}
                                  textValue="Delete"
                                  onClick={() =>
                                    openModal("Share", () => {
                                      setLink(draft.link);
                                      setName(draft.name);
                                    })
                                  }
                                  id="share-draft-submenu"
                                >
                                  Share
                                  <BiExport size={18} />
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="w-[80%] self-center border-t border-gray-300" />
                                <DropdownMenu.Item
                                  className={DropdownStyle}
                                  textValue="Delete"
                                  onClick={() => {
                                    setId(draft.id);
                                    openModal("Delete", () => {
                                      setLink(draft.link);
                                      setName(draft.name);
                                    });
                                  }}
                                  id="delete-draft-submenu"
                                >
                                  Delete
                                  <BiTrash size={18} />
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="w-[80%] self-center border-t border-gray-300" />
                                <DropdownMenu.Item
                                  className={DropdownStyle}
                                  textValue="Delete"
                                  onClick={() => {
                                    openModal("Rename", () => {
                                      setName(draft.name);
                                      setLink(draft.link);
                                      setId(draft.id);
                                    });
                                  }}
                                  id="rename-draft-submenu"
                                >
                                  Rename
                                  <BiPencil size={18} />
                                </DropdownMenu.Item>
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Portal>
                            {!(index + 1 >= drafts.length) && (
                              <div className="w-[80%] self-center border-t border-gray-300"></div>
                            )}
                          </DropdownMenu.Sub>
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="flex w-32 flex-col text-center">
                      <DropdownMenu.Sub>
                        <p id="no-draft-popover" className="text-gray-600">
                          You currently have no drafts
                        </p>
                      </DropdownMenu.Sub>
                    </div>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
              |
              {!!user.isSignedIn && (
                <section className="h-5 rounded-full">
                  <Image
                    src={userProps?.imageUrl!}
                    className="cursor-pointer rounded-full"
                    width={24}
                    height={24}
                    alt="Profile Picture"
                    id="profile-picture"
                  />
                </section>
              )}
              |
              <div id={user.isSignedIn ? "sign-out" : "sign-"}>
                {!user.isSignedIn && <SignInButton />}
                {!!user.isSignedIn && <SignOutButton />}
              </div>
            </section>
          </nav>
          <Modal
            closeModal={() => setOpen(false)}
            open={open}
            label={label}
            importDraft={importDraft}
            link={link}
            setLink={updateLink}
            name={name}
            id={id}
            setName={updateName}
            onDeleteDraft={onDeleteDraft}
            onUpdateDraft={onUpdateDraft}
            onResetDraft={onResetDraft}
          />
        </DropdownMenu.Root>
      </Dialog.Root>
    </>
  );
}
