import React from 'react'
import Main from "./Main"
import Navbar from "../Common/Navbar"
function Home({isAuthenticated}) {
    return (
        <div className="__className_ea5f4b antialiased min-h-screen bg-black text-neutral-400">
            <Navbar isAuthenticated={isAuthenticated} />
            <Main />
        </div>
    )
}

export default Home
