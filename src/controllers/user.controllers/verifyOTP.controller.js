import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const verifyUserOTP = asyncHandler(
    async(req, res) => {
        const { id, OTP } = req.body;

        if(!OTP) throw new ApiError(401, "Enter OTP First");

        if(!id) throw new ApiError(500, "Use Link : Server Error");

        const userObj = await User.findById(id);

        if(!userObj) throw new ApiError(404, "User Not Found");

        if(userObj.verificationCode !== OTP) throw new ApiError(409, "OTP Wrong");

        userObj.isVerified = true;
        userObj.verificationCode = undefined;
        userObj.save({validateBeforeSave: false});

        res.status(200).json(
            new ApiResponse(
                200,
                {},
                "User Verified"
            )
        );

    }
);

export { verifyUserOTP }