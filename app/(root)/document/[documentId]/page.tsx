import Header from '@/components/shared/header'
import { DocIdProps } from '@/types'
import React from 'react'

const DocumentPage = ({ params }: DocIdProps) => {
    return (
        <>
            <Header label={"Drive"} isHome />
        </>
    )
}

export default DocumentPage