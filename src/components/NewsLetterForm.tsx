'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import { TextInput } from "@/components/TextInput";

const newsLetterSchema  = z.object({
    email: z.string({required_error:"Digite o seu Email."}).email('Digite um email válido'),
})

type newsLetterSchemaData = z.input<typeof newsLetterSchema>

export function NewsLetterForm(){
    const {formState,register, handleSubmit,} = useForm<newsLetterSchemaData>({
        resolver: zodResolver(newsLetterSchema)
    })
    const { errors, isSubmitting} = formState

    async function handleSubscribeEmail(formData:newsLetterSchemaData) {
        
    }
    return (
        <form 
            onSubmit={handleSubmit(handleSubscribeEmail)}
            className="w-full flex flex-col gap-5"
        >
            
            <TextInput.Root>
                <TextInput.Label>Email</TextInput.Label>
                <TextInput.Input
                    disabled={isSubmitting}
                    placeholder='Email'
                    {...register('email')}
                    isInvalid={!!errors.email}
                    

                />
                {
                    errors.email && (
                        <TextInput.Error className="text-white">
                            {errors.email.message}
                        </TextInput.Error>
                    )
                }
            </TextInput.Root>
            <Button 
                disabled={isSubmitting}
                className="hover:bg-yellow-400"
            >
                Subscribe
            </Button>
        </form>
    )
}