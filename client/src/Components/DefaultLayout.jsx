import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function DefaultLayout() {

    return (
        <>
            <Navbar />
            <div className="pt-16">
                <Outlet />
            </div>
        </>
    )
}

export default DefaultLayout