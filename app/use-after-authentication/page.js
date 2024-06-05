import LoginBtn from "@/app/LoginBtn";
import ResisterBtn from "@/app/ResisterBtn";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function useAfterAuthentication() {

    const session = await getServerSession(authOptions);

    if (session != null) {
        console.log("로그인 완료")
        redirect("/")// 세션이 있으면 바로 리디렉션
    }

    return(
        <div className={"use-after-authentication-container"}>
            <h1>로그인 후 사용 부탁드립니다</h1>
            <div className={"authentication-container"}><ResisterBtn></ResisterBtn><LoginBtn></LoginBtn></div>
        </div>
    )
}