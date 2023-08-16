import Cookies from "js-cookie";

interface UserProps {
    name: string;
    email: string;
    id: string;
}


export function getUserInClientSide(){
    const userInStringify = Cookies.get('user')

    console.log(Cookies.get())
    
    if(!userInStringify) return undefined;

    

    const user: UserProps = JSON.parse(userInStringify)


    return user
}