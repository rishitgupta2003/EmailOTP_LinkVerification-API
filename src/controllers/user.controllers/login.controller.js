import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const loginUser = asyncHandler(
    async(req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne(
            {
                "email":email,
                "password":password
            }
        ).select("-password -verificationCode");

        if(!user) throw new ApiError(404, "User Doesn't Exist");

        console.log(user);

        if(!user.isVerified){
            const verificationCode = getRandomInt(100000);
            user.verificationCode = verificationCode;
            user.save({validateBeforeSave: false}); 
            
            const token = jwt.sign(
                {
                    _id : user._id,
                    verificationCode: verificationCode
                },
                process.env.REGISTER_TOKEN_PASS,
                {
                    expiresIn: process.env.REGISTER_TOKEN_EXPIRY
                }
            );

                if(!token) throw new ApiError(500, "Request Token Again");

            const message = `Verify your Email -> OTP : ${verificationCode} OR Click on the link given -> http://localhost:${process.env.PORT}/api/v1/users/verifyToken?token=${token}`;

            return res.status(300).json(
                new ApiResponse(
                    300,
                    user,
                    message
                )
            );
        }

        res.status(200).json(
            new ApiResponse(
                200,
                user,
                "login Successfull"
            )
        );

    }
)

export { loginUser }