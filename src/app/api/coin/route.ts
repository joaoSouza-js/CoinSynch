import { prisma } from "@/services/prisma";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextResponse,response: NextApiResponse){
    const coinSchema = z.object({
        amount: z.number({required_error: 'Amount not informed'}),
        coinId: z.coerce.number({required_error: 'CoinId not informed'}),
        userId: z.string({required_error: 'user Id not provided'}).uuid(),
        name: z.string({required_error: 'Name not provided'}),
        url: z.string({required_error: 'Url not provided'}),


    });

    const req = await request.json()

    const coinToSave = coinSchema.parse(req)

    const user = await prisma.user.findUnique({
        where: {
            id: coinToSave.userId
        },
        include: {
            coins: true
        }
    })

    if(!user){
        return new NextResponse('user not exist', {
            status: 404,
        });
    }
    
    const coin = user.coins.find(coin => coin.coinId === coinToSave.coinId)

    if(!coin){
        await prisma.coin.create({
            data: {
                amount: coinToSave.amount,
                coinId: coinToSave.coinId,
                name: coinToSave.name,
                url: coinToSave.url,
                ownerId: user.id
            }
        })

        return NextResponse.json({})
    }

    await prisma.coin.update({
        where: {
            id: coin.id,
        },
        data: {
            amount: coin.amount + coinToSave.amount
        }

    })

    return NextResponse.json({})

    
    





}