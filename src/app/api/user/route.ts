import { prisma } from '@/services/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {cookies} from  'next/headers'

export async function POST(request: Request, response: NextResponse) {

    const { searchParams } = new URL(request.url)

    const signupSchema = z.object({
        name: z.string({required_error: 'name not informed'}),
        email: z.string({required_error: 'email not informed'}).email('email invalid'),
        password: z.string({required_error: 'password not informed'}),
    });

    const redirectUrl = new URL('/dashboard', request.url)

    const requestBody =  await request.json()

    const { name, password,email } = signupSchema.parse(requestBody);

    const userExist  = await prisma.user.findUnique({
        where: {
            email: email   
        }
    })

    if(userExist){
        return new NextResponse('email already exists', {
            status: 409
        })
    }

    await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: password
        }
    })

    const userInfo = {
        name: name,
        email: email
    }
    
    const userInfoInStringify= JSON.stringify(userInfo)

    

    const cookieExpiration = 60 * 60 * 24 * 30 // 30 days

    return NextResponse.redirect(redirectUrl, {
        headers: {
          'Set-Cookie': [
            `user=${userInfoInStringify}; Path=/;  max-age=${cookieExpiration}`,
          ] as any,
           
        }
    })

   return NextResponse.json(userInfo)
}

export async function GET(request: Request, response: NextResponse) {
    const userEmailSchema = z.object({
        email: z.string({ required_error: 'Email not informed' }).email('Invalid email format'),
    });

    const requestBody =  await request.json()

    const { email } = userEmailSchema.parse(requestBody);

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            name: true,
            email: true,
        },
    });

    if (!user) {
        return new NextResponse('email not registred', {
            status: 404,
        });
    }

    

    return NextResponse.json(user)
}