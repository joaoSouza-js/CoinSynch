import Cookies from "js-cookie";

interface UserProps {
    name: string;
    email: string;
    id: string;
}


export function getUserInClientSide(){
    const userInStringify = Cookies.get('user')
    
    if(!userInStringify) return undefined;

    const user: UserProps = JSON.parse(userInStringify)


    return user
}