"use client"

import Header from '@/components/shared/header'
import { UserProfile } from '@clerk/nextjs'
import { dark, shadesOfPurple } from '@clerk/themes'
import { useTheme } from 'next-themes'
import React from 'react'

const SettingsPage = () => {
    const { resolvedTheme } = useTheme();
    return (
        <div className='container'>
            <Header label='Settings' isDocumentPage />
            <div className='mt-6'>
                <UserProfile
                    appearance={{
                        baseTheme: resolvedTheme === "dark" ? dark : shadesOfPurple,
                    }}
                />
            </div>
        </div>
    )
}

export default SettingsPage