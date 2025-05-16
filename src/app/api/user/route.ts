import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(){
    try {
        const result = await prisma.user.findUnique({
            where:{
                email:"jellanarta@gmail.com"
            }
        })
    } catch (error) {
        
    }
}
export async function POST(request:NextRequest){
    try {
        
    } catch (error) {
        
    }
}
export async function PUT(){
    try {
        
    } catch (error) {
        
    }
}
export async function DELETE(){
    try {
        
    } catch (error) {
        
    }
}