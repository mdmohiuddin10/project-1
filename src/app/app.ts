import express, { NextFunction, Request, Response, request } from 'express'
const app = express()
const port = 3000

// parsers
app.use(express.json())
app.use(express.text())

// router
const userRouter = express.Router()
const courseRouter = express.Router()



app.use('/api/v1/users', userRouter)
app.use('/api/v1/course', courseRouter)


userRouter.post('/create-user', (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);

    res.json({
        success: true,
        message: "user created successfully",
        data: user
    })
})


courseRouter.post('/create-course', (req: Request, res: Response) => {
    const course = req.body;
    console.log(course);

    res.json({
        success: true,
        message: "user created successfully",
        data: course
    })
})



// middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.hostname);

    next()
}


app.get('/', logger, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send('Hello')
    } catch (error) {
        console.log(error);

        next(error)
    }

})


app.post('/', logger, (req: Request, res: Response) => {
    console.log(req.body);
    res.send('got data')
})

// global router error 
app.all("*", (req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: "Route not found"
    })
})

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "failed to get data"
        })
    }
})


export default app;

