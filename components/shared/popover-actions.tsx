"use client"
import { FileUp, Folder, FolderUp, Star, Trash } from "lucide-react";
import React, { useRef } from "react";
import { Separator } from "../ui/separator";
import { useFolder } from "@/hooks/use-folder";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";

const PopoverActions = () => {
    const { user } = useUser();
    const { onOpen } = useFolder()
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const { documentId } = useParams()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        let image = "";
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                image = e.target?.result as string;
            };
        }
        const folderId = documentId as string;
        const collectionRefs = !documentId ? collection(db, "files") : collection(db, "folders", folderId, "files");
        const promise = addDoc(collectionRefs, {
            name: file.name,
            type: file.type,
            size: file.size,
            uid: user?.id,
            timestamp: serverTimestamp(),
            isArchive: false,
        }).then((docs) => {
            const refs = documentId ? ref(storage, `files/${folderId}/${docs.id}/image`) : ref(storage, `files/${docs.id}/image`);
            uploadString(refs, image, "data_url").then(() => {
                getDownloadURL(refs).then((url) => {
                    const update = !documentId ? doc(db, "files", docs.id) : doc(db, "folders", folderId, "files", docs.id);
                    updateDoc(update, {
                        image: url,
                    });
                }, () => {
                    router.refresh()
                });
            });
        });

        toast.promise(promise, {
            loading: "Loading...",
            success: "Uploaded!",
            error: "Error uploading file",
        });
    }
    return (
        <>
            {
                !documentId && (
                    <>
                        <div
                            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                            role="button"
                            onClick={onOpen}
                        >
                            <Folder className="w-4 h-4" />
                            <span>New folder</span>
                        </div>
                        <Separator />
                    </>
                )
            }
            <label>
                <div
                    className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                    role="button"
                >
                    <FileUp className="w-4 h-4" />
                    <span>File upload</span>
                </div>
                <Input type="file" className="hidden" accept="image/*" ref={inputRef} onChange={onChange} />
            </label>
            <label>
                <div
                    className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                    role="button"
                >
                    <FolderUp className="w-4 h-4" />
                    <span>Folder upload</span>
                </div>
                <Input type="file" className="hidden" accept="image/*" ref={inputRef} onChange={onChange} />
            </label>
            {documentId && (
                <>
                    <Separator />
                    <div
                        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                        role="button"
                    >
                        <Trash className="w-4 h-4" />
                        <span>Trash</span>
                    </div>
                    <div
                        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                        role="button"
                    >
                        <Star className="w-4 h-4" />
                        <span>Starred</span>
                    </div>
                </>
            )}
        </>
    );
};

export default PopoverActions;