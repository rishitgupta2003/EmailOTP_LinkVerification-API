import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { mailUser } from "../../utils/nodeMailer.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const registerUser = asyncHandler(
    async(req, res) => {
        const { name, email, password } = req.body;
        const verificationCode = getRandomInt(100000);

        const userExist = await User.findOne(
            {
                email: email
            }
        );

        if(userExist) throw new ApiError(409, "Email ID Already in Use");

        const createdUser = await User.create(
            {
                "name": name,
                "email": email,
                "password": password,
                "verificationCode": verificationCode
            }
        );

        if(!createdUser) throw new ApiError(500, "User Not Created");

        console.log(createdUser);
        req.user = createdUser._id;

        const token = jwt.sign(
            {
                _id : createdUser._id,
                verificationCode: verificationCode
            },
            process.env.REGISTER_TOKEN_PASS,
            {
                expiresIn: process.env.REGISTER_TOKEN_EXPIRY
            }
        );

        if(!token) throw new ApiError(500, "Request Token Again");

        const message = `<div style="font-family: Arial, sans-serif; padding: 20px;">
            <p style="font-size: 16px;">Verify your Email:</p>
            <p style="font-size: 16px;">OTP: ${verificationCode}</p>
            <p style="font-size: 16px;">OR Click on the button below:</p>
            <a href="http://localhost:${process.env.PORT}/api/v1/users/verifyToken?token=${token}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 10px;">Verify Email</a>
        </div>`;
            
        mailUser(email, "Verify Your Account", message);
        
        
        res.status(200).json(
            new ApiResponse(
                200,
                createdUser,
                message
            )
        );

    }
)


export { registerUser };