const asyncHandler = (requestHandler) => async (req, res, next) => {
    try{
        return await requestHandler(req, res, next);
    }catch(error){
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Something Went Wrong"
        });
    }
}

export { asyncHandler };