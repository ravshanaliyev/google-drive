import { ChildProps } from '@/types'
import React from 'react'

const AuthLayout = ({ children }: ChildProps) => {
    return (
        <div>
            <p>Navbar</p>
            <p>Sidebar</p>
            {children}
        </div>
    )
}

export default AuthLayout