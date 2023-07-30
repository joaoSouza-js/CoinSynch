import { prisma } from '@/services/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: Request, response: NextResponse) {
    const signupSchema = z.object({
        email: z.string({required_error: 'email not informed'}).email('email invalid'),
    });

    const requestBody =  await request.json()

    const { email } = signupSchema.parse(requestBody);

    const emailAlreadySubscribed  = await prisma.subscriber.findUnique({
        where: {
            email: email   
        }
    })

    if(emailAlreadySubscribed){
        return  NextResponse.json({
            message:'user already subscribed'
        })
    
    }

    await prisma.subscriber.create({
        data: {
            email: email
        }
    })

    return NextResponse.json({
        message:'user subscribed'
    })

    


}