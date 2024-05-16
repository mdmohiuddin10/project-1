import { Server } from 'http'
import app from './app'

const PORT = 5004

let server: Server

async function bootstrap() {
    server = app.listen(PORT, () => {
        console.log(`my app listening on port ${PORT}`)
    })
}

bootstrap()

