import Header from '@/components/shared/header'
import React from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import SuggestCard from "../../../components/card/suggested-card";
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { auth } from '@clerk/nextjs';
import ListItem from '@/components/shared/list-item';
import TrashItem from '@/components/shared/trash-item';
const getData = async (uid: string, type: "files" | "folders") => {
    let data: any[] = [];
    const q = query(
        collection(db, type),
        where("uid", "==", uid),
        where("isArchive", "==", false)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });

    return data;
};


const TrashPage = async () => {
    const { userId } = auth();
    const folders = await getData(userId!, "folders");
    const files = await getData(userId!, "files");
    return (
        <>
            <Header label='Trash' />
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Archived time</TableHead>
                        <TableHead>File size</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...files, ...folders].map((folder) => (
                        <TrashItem key={folder.id} item={folder} />
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default TrashPage