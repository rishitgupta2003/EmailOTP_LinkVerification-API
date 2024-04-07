import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyUserLink = asyncHandler(
    async(req, res) => {
        const token = req.query.token;

        if(!token) throw new ApiError(404, "Unauthorised Request");

        const decodedToken = jwt.verify(
            token,
            process.env.REGISTER_TOKEN_PASS
        );

        const id = decodedToken._id;
        const verificationCode = decodedToken.verificationCode;

        const user = await User.findById(id).select("-password");

        if(!user) throw new ApiError(404, "Unauthorized Request");

        if(user.verificationCode !== verificationCode) throw new ApiError("404", "Use Latest Link");

        user.verificationCode = undefined;
        user.isVerified = true;

        user.save({validateBeforeSave: false});

        res.status(200).json(
            new ApiResponse(
                200,
                user,
                "You Can Now Login"
            )
        );
    }
);

export { verifyUserLink }