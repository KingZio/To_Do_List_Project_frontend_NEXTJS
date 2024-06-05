'use client'

import { signIn } from 'next-auth/react'

export default function ResisterBtn() {
    return(
        <button onClick={() => { signIn() }}>회원가입</button>
    )
}