import ErrorHandler from "../utils/errorHandler.js"

const notFound=(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}
const errorMiddleware= (err,req,res,next)=>{
    err.statusCode=err.statusCode || 500

    let error={...err}
    error.message=err.message

    if(err.name=== "CastError"){
        const message=`Resource not found. Invalid: ${err.path}`
        error=new ErrorHandler(message,400)
    }
    
    if(err.name=== "ValidationError"){
        const message=Object.values(err.errors).map(value=>value.message)
        error=new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        error,
        message:error.message,
        stack:error.stack
    })
}

export { errorMiddleware, notFound }

