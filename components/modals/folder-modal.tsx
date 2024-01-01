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
import { useFolder } from '@/hooks/use-folder'

const FolderModal = () => {
    const { isOpen, onClose } = useFolder()
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className='max-w-sm'>
                <DialogHeader>
                    <DialogTitle>New folder</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-2">

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FolderModal