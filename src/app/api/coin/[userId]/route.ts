import { prisma } from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function  GET(request:NextRequest, { params }: { params: { userId: string }} ) {
    const {userId} = params

    if (!userId) {
        return new NextResponse("Inform the user id", {
            status: 404,
        });
    }

    console.log(userId)
    
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            coins: true
        }
    })

    if (!user) {
        return new NextResponse("cant't find the user", {
            status: 404,
        });
    }


    return NextResponse.json({
        coins: user.coins
    })
}