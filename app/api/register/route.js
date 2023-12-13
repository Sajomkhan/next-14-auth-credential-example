import { connectDB } from "../../utils/connect"
import User from "../../models/userModel"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
try {
    await connectDB()
    const {email, password} = await req.json();
    const exists = await User.findOne({email})
    // const exists = await User.findOne({$or:[{email},{username}]})
    if(exists){
        return NextResponse.json({message: "Email already exist"}, {status: 500})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({email, password: hashedPassword})
    return NextResponse.json({message: "User registered"}, {status: 201});
} catch (error) {
    console.log("Error while registering user.", error);
    return NextResponse.json({message: "Error occured while registering the user"}, {status: 500});
}
}
