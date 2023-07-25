import './config/db.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import Express from 'express'
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = Express()
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))

//routes
import authenticationRouter from './routes/authentication.routes.js'
import staticFile from './routes/staticFile.routes.js'
import itemRouter from './routes/item.routes.js'

app.use('/file/public', Express.static(path.join(__dirname, 'public')))
app.use('/authentication', authenticationRouter)
app.use('/item', itemRouter)
app.use('/file', staticFile)

app.listen(PORT, () => console.log(`👽 Server running on port ${PORT}`))

