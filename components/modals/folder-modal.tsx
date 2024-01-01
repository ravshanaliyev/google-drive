"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { toast } from 'sonner'
import { useFolder } from '@/hooks/use-folder'
import { useForm } from 'react-hook-form';
import { formSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUser } from '@clerk/nextjs';

const FolderModal = () => {
    const { isOpen, onClose } = useFolder()
    const { user } = useUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const promise = addDoc(collection(db, "folders"), {
            name: values.name,
            timestamp: serverTimestamp(),
            uid: user?.id,
            isArhive: false,
        }).then(() => {
            form.reset();
            onClose();
        });

        toast.promise(promise, {
            loading: "Loading...",
            success: "Folder created",
            error: "Error creating folder",
        });
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className='max-w-sm'>
                <DialogHeader>
                    <DialogTitle>New folder</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl className='outline-none'>
                                            <Input placeholder="Folder name" {...field} className='rounded-none focus-visible:outline-none' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end items-center space-x-2">
                                <Button
                                    variant={"link"}
                                    size={"sm"}
                                    onClick={onClose}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button variant={"outline"} size={"sm"} type="submit">
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FolderModal