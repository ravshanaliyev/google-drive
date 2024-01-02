import Header from '@/components/shared/header'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import SuggestCard from "../../../components/card/suggested-card";
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { auth } from '@clerk/nextjs';
import ListItem from '@/components/shared/list-item';
const getFolders = async (uid: string, type: "folders") => {
    let data: any[] = [];
    const q = query(
        collection(db, type),
        where("uid", "==", uid),
        where("isArhive", "==", false),
        limit(4)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });
    return data;
};
const getFiles = async (uid: string, type: "files") => {
    let data: any[] = [];
    const q = query(
        collection(db, type),
        where("uid", "==", uid),
        where("isArchive", "==", false),
        limit(4)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });
    return data;
};

const RecentPage = async () => {
    const { userId } = auth();
    const folders = await getFolders(userId!, "folders");
    const files = await getFiles(userId!, "files");
    return (
        <>
            <Header label='Starred' />
            <div className="text-sm opacity-70 mt-6">Suggested</div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {files.map((file) => (
                    <SuggestCard item={file} key={file.id} />
                ))}
            </div>
            <div className="text-sm opacity-70 mt-6">Folders</div>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>File size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {folders.map((folder) => (
                        <ListItem key={folder.id} item={folder} />
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default RecentPage