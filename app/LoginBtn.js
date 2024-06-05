'use client'

import { signIn } from 'next-auth/react'

export default function LoginBtn() {
    return(
        <button onClick={() => { signIn(), { callbackUrl: '/' } }}>로그인</button>
    )
}