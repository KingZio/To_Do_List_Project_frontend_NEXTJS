import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import LoginBtn from "@/app/LoginBtn";
import LogoutBtn from "@/app/LogoutBtn";

export default async function useAfterAuthentication() {

    let session = await getServerSession(authOptions)

    if (session != null) redirect("/")

    return(
        <div className={"use-after-authentication"}>
            <p>로그인 후 이용해주세요</p>
            <div className={"use-after-authentication-buttons"}>
                <LoginBtn></LoginBtn>
                <LogoutBtn></LogoutBtn>
            </div>
        </div>
    )
}