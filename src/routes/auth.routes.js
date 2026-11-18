const {Router} =require("express")
const authController=require("../controller/auth.controller")
const authMiddleware=require("../middlewares/auth.middleware")



const authRouter=Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register",authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description logout the user and then remove token from the cookies and blacklist the token
 * @access Public
 */

authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET /api/auth/getmecontroller
 * @description shows the details of the user 
 * @access Private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports=authRouter