import { prisma } from '@/services/prisma';
import { NextResponse,  } from 'next/server';
import { z } from 'zod';
import { redirect } from 'next/navigation'
import { NextApiResponse } from 'next';

export async function POST(request: NextResponse,response: NextApiResponse){

    const userSession = z.object({

        email: z.string({ required_error: 'Email not informed' }).email('Invalid email format'),
        password: z.string({required_error: 'Password not informed'})

    });

    const redirectUrl = new URL('/dashboard', request.url)

    const requestBody =  await request.json()

    

    const { email,password } = userSession.parse(requestBody);

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        
    });

    if (!user) {
        return new NextResponse('email not registered', {
            status: 404,
        });
    }

    if(user.password !==  password) {
        return new NextResponse('credentials incorrect', {
            status: 404,
        });
    }

    const userInfo = {
        id: user.id,
        email: user.email,
        name: user.name
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
}