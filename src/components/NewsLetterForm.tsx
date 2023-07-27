'use client'

import Button from "@/components/Button";
import { TextInput } from "@/components/TextInput";

export function NewsLetterForm(){
    return (
        <form className="w-full flex flex-col gap-5">
            
            <TextInput.Root>
                <TextInput.Label>
                    Email
                </TextInput.Label>
                <TextInput.Input/>
            </TextInput.Root>
            <Button className="hover:bg-yellow-400">
                Subscribe
            </Button>
        </form>
    )
}