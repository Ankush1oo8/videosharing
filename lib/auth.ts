import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
export const authOption: NextAuthOptions ={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email ||!credentials?.password){
                    throw new Error ("Email and Password Are REQUIRED!!")
                }
                try {
                    await connectToDatabase()
                    const user=await User.findOne({email:credentials.email});
                    if(!user){
                        throw new Error("User not found!!");
                    }
                    const isValid=await bcrypt.compare(credentials.password,user.password);

                    if(!isValid){
                        throw new Error("Invalid Password");
                    }

                    return {
                        id:user._id.toString(),
                        email:user.email
                    }

                } catch (error) {
                    console.error("Problem In Login",error);
                    throw error
                }
            },
        })
    ],
    callbacks:{
        async jwt({token ,user}){
            if(user){
                token.id=user.id
            }
            return token
        },

        async session({token ,session}){
            if(session.user){
                session.user.id=token.id as string
            }
            return session
        }
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge: 30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET
};
