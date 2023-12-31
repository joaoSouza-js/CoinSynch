import Cookies from "js-cookie";
import { cookies } from "next/headers";

interface UserProps {
    name: string;
    email: string;
    id: string;
}

export function getUser(){
    const userInStringify = cookies().get('user')?.value;
    
    if(!userInStringify) return undefined;

    const user: UserProps = JSON.parse(userInStringify)


    return user

}