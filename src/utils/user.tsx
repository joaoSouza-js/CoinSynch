import { cookies } from "next/headers";

interface UserProps {
    name: string;
    email: string;
}

export function getUser(){
    const userInStringify = cookies().get('user')?.value;
    
    if(!userInStringify) return undefined;

    const user: UserProps = JSON.parse(userInStringify)
    
    console.log(user)

    return user

}