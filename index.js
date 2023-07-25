import './config/db.js'
import cors from "cors"
import morgan from "morgan"
import Express from "express"
import bodyParser from 'body-parser'

const app = Express()
const PORT = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({ origin: "*" }))
app.use(bodyParser.urlencoded({ extended: true }))

//routes
import authenticationRouter from './routes/authentication.routes.js'
import itemRouter from './routes/item.routes.js'
app.use('/authentication', authenticationRouter)
app.use('/item', itemRouter)


app.listen(PORT, () => console.log(`👽 Server running on port ${PORT}`))