import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {email,password}=await request.json();
        if(!email || !password){
            return NextResponse.json(
                {
                    error:"email are password are required"
                },{
                    status:400
                }
            )
        }

        await connectToDatabase()
        const existingUser=await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {
                    error:"User already Registered"
                },{
                    status:400
                }
            )
        }

        User.create({
            email,
            password
        })

        return NextResponse.json(
            {
                message:"User Registered Successfully"
            },{
                status:200
            }
        )

    } catch (error) {
        console.error("Registration Failed",error)
        return NextResponse.json(
                {
                    error:"error in registration"
                },{
                    status:400
                }
            )
        
    }
}