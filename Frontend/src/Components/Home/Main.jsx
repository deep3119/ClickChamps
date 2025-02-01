import React from 'react'
import Master from './Master'
import Choose from './Choose'
import Numbers from './Numbers'
import TypingPro from './TypingPro'
import UserSays from './UserSays'
import Footer from './Footer'

function Main() {
    return (
        <main className="grid place-content-center mt-20">
            <Master />
            <Choose />
            <Numbers />
            <TypingPro />
            {/* <UserSays /> */}
            <Footer />
        </main>
    )
}

export default Main
