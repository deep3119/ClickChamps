import React, { useState } from 'react'
import Navbar from '../Common/Navbar'
import SignIn from '../Common/Signin'
import SignUp from '../Common/SignUp'


function Form() {
    const [signInMethod, setSignInMethod] = useState(true)
    return (
        <div className='__className_ea5f4b antialiased min-h-screen bg-gradient-to-b from-neutral-900 to-black text-neutral-400'>
            <Navbar />
            {signInMethod === true ? <SignIn setSignInMethod={setSignInMethod} /> : <SignUp setSignInMethod={setSignInMethod}/>}
        </div>

    )
}

export default Form
