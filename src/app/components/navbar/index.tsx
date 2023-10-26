import { useAppContext } from "@/store/context";
import { updateFullDraft } from "@/store/draft/actions";
import { storeDrafts } from "@/store/menu/actions";
import { type GameSeries } from "@/store/types";
import { api } from "@/trpc/react";
import { DEFAULT_BO1_STATE } from "@/utils/setDefaultValues";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { BiChevronRight, BiExport, BiImport, BiPencil, BiTrash } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { Modal } from "../modal";

export type OperationsMapEnum =
  | "Import"
  | "Export"
  | "Share"
  | "Delete"
  | "Update"
  | "Create"
  | "Rename";


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
    }
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
        }
      );
      fetchDrafts();
    },
    [deleteDraft, id, userProps]
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
        }
      );
      fetchDrafts();
    },
    [state.draft, updateDraft, name, link]
  );

  const fetchDrafts = async () => {
      const response = await refetch();
      if (response.data) dispatch({ type: 'menu', action: storeDrafts(response.data) });
  }

  const onCreateNew = useCallback(
    (callback: () => void) => {
      dispatch({ type: 'draft', action: updateFullDraft(DEFAULT_BO1_STATE) });
      callback();
    }, [dispatch]);


  function openModal(param: OperationsMapEnum, callback?: () => void) {
    if (callback) callback();
    setLabel(param);
    setOpen(true);
  };

  const selectedMatch = () => {
    return games[game - 1]!;
  }

  const importDraft = (param: GameSeries) => {
    dispatch({ type: 'draft', action: updateFullDraft(param) });
  };

  const updated = () => {
    return {
      drafts: state.menu.drafts
    }
  };

  useEffect(() => {
    fetchDrafts()
  },[open, user.user?.id]);

  const updateLink = useCallback((link: string) => {
    setLink(link);
  }, []);

  const updateName = useCallback((name: string) => {
    setName(name);
  }, []);

  return (
    <>
      <Dialog.Root defaultOpen={false} open={open}>
        <DropdownMenu.Root>
          <nav className="flex flex-row justify-between self-center items-center py-3 px-8 w-full max-w-[1440px] border-b-2">
            <section className="flex flex-row gap-8">
              <span className="text-gray-100 font-bold hover:text-gray-300 cursor-pointer" onClick={() => openModal("Import")}>
                {"Import"}
              </span>
              {!!user.isSignedIn && (
                <>
                  {!!user.isSignedIn &&
                    games.length > 0 &&
                    selectedMatch !== null ? (
                    <button
                      className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer"
                      onClick={() => openModal("Export")}
                    >
                      {"Export"}
                    </button>
                  ) : null}
                  <span
                    onClick={() => openModal("Share")}
                    className="text-gray-100 font-bold hover:text-gray-300 cursor-pointer"
                  >
                    {"Share"}
                  </span>
                  <span
                    onClick={() => openModal("Update")}
                    className="text-gray-100 font-bold hover:text-gray-300 cursor-pointer"
                  >
                    {"Save"}
                  </span>
                  <span
                    className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer"
                    onClick={() => openModal("Create")}
                  >
                    {"New"}
                  </span>
                </>
              )}
            </section>
            <section className="flex flex-row gap-4">
              {!!user.isSignedIn && (
                <DropdownMenu.Trigger>
                  <p className="font-bold">My Drafts</p>
                </DropdownMenu.Trigger>
              )}
              <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={5} className="z-10 flex flex-col gap-1 w-[10rem] mt-2 p-2 bg-white rounded-md shadow-md cursor-pointer">
                  {updated().drafts.length > 0
                    ? updated().drafts?.map((draft, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col text-gray-600 hover:text-gray-400">
                          <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger className="flex flex-row items-center justify-between">
                              <p className="w-[90%]  text-gray-600 self-start p-2">
                                {draft.name}
                              </p>
                              <BiChevronRight size={24} />
                            </DropdownMenu.SubTrigger>
                            <DropdownMenu.Portal>
                              <DropdownMenu.SubContent
                                className="z-10 flex flex-col gap-1 w-24 px-2 content-center justify-between bg-white rounded-md p-1 shadow-md cursor-pointer"
                                sideOffset={10}
                                alignOffset={5}
                                hideWhenDetached
                              >
                                <DropdownMenu.Item
                                  className="flex flex-row items-center justify-between text-gray-600 hover:text-gray-400"
                                  textValue="Import"
                                  onClick={() => {
                                    openModal("Import", () => {
                                      setLink(draft.link);
                                      setName(draft.name);
                                    });
                                  }}>
                                  Import
                                  <BiImport size={18} />
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="border-t border-gray-300 w-[80%] self-center" />
                                <DropdownMenu.Item
                                  className="flex flex-row items-center justify-between text-gray-600 hover:text-gray-400"
                                  textValue="Delete"
                                  onClick={() =>
                                    openModal("Share", () => {
                                      setLink(draft.link);
                                      setName(draft.name);
                                    })
                                  }>
                                  Share
                                  <BiExport size={18} />
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="border-t border-gray-300 w-[80%] self-center" />
                                <DropdownMenu.Item
                                  className="flex flex-row items-center justify-between text-gray-600 hover:text-gray-400"
                                  textValue="Delete"
                                  onClick={() => {
                                    setId(draft.id);
                                    openModal("Delete", () => {
                                      setLink(draft.link);
                                      setName(draft.name);
                                    });
                                  }}>
                                  Delete
                                  <BiTrash size={18} />
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator className="border-t border-gray-300 w-[80%] self-center" />
                                <DropdownMenu.Item
                                  className="flex flex-row items-center justify-between text-gray-600 hover:text-gray-400"
                                  textValue="Delete"
                                  onClick={() => {
                                    openModal("Rename", () => {
                                      setName(draft.name);
                                      setLink(draft.link);
                                      setId(draft.id);
                                    });
                                  }}>
                                  Rename
                                  <BiPencil size={18} />
                                </DropdownMenu.Item>
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Portal>
                            {!(index + 1 >= drafts.length) && (
                              <div className="border-t border-gray-300 w-[80%] self-center"></div>
                            )}
                          </DropdownMenu.Sub>
                        </div>
                      </React.Fragment>
                    ))
                    : <div className='w-32 flex flex-col text-center'>
                      <DropdownMenu.Sub>
                        <p className="text-gray-600">
                          You currently have no drafts
                        </p>
                      </DropdownMenu.Sub>
                    </div>
                  }
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
              <IoMdSettings
                size={24}
                className="fill-gray-100 cursor-pointer hover:fill-gray-300"
              />

              {!!user.isSignedIn && (
                <section className="rounded-full h-5">
                  <Image
                    src={userProps?.imageUrl!}
                    className="rounded-full cursor-pointer"
                    width={24}
                    height={24}
                    alt="Profile Picture"
                  />
                </section>
              )}
              <div>
                {!user.isSignedIn && <SignInButton />}
                {!!user.isSignedIn && <SignOutButton />}
              </div>
            </section>
          </nav>
          <Modal
            open={open}
            label={label}
            closeModal={() => setOpen(false)}
            importDraft={importDraft}
            link={link}
            setLink={updateLink}
            name={name}
            setName={updateName}
            onDeleteDraft={onDeleteDraft}
            onUpdateDraft={onUpdateDraft}
            onCreateNew={onCreateNew}
            id={id}
          />
        </DropdownMenu.Root>
      </Dialog.Root>
    </>
  )
}