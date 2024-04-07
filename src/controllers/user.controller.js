import { loginUser } from "./user.controllers/login.controller.js";
import { registerUser } from "./user.controllers/register.controller.js";
import { verifyUserLink } from "./user.controllers/verifyLink.controller.js";
import { verifyUserOTP } from "./user.controllers/verifyOTP.controller.js";

export {
    registerUser,
    loginUser,
    verifyUserLink,
    verifyUserOTP
}