import ListClient from "@/app/session";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";

export default async function ListPage(){

    let session = await getServerSession(authOptions)

    if(session == null) {
        redirect("/use-after-authentication")
    }
    console.log(session)

    return(
        <div>
            <ListClient name={session.user.name}></ListClient>
        </div>
    )
}