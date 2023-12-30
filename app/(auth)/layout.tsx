import Navbar from '@/components/shared/navbar'
import { ChildProps } from '@/types'
import React from 'react'

const AuthLayout = ({ children }: ChildProps) => {
    return (
        <div>
            <Navbar />
            <p>Sidebar</p>
            {children}
        </div>
    )
}

export default AuthLayout