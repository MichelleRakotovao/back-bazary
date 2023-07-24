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
import authentication from './routes/authentication.routes.js'
app.use('/authentication', authentication)

// version clone 1

app.use(bodyParser.json())
import { addClass,displayClass,displayClassOne,editClass,deleteClass} from './controllers/category.Controller.js'
import { addUnderClass,displayUnderClass,displayUnderClassOne,editUnderClass,deleteUnderClass } from './controllers/subCategory.Controller.js'
import { addItem,displayItem,displayItemOne,editItem,deleteItem } from './controllers/item.Controller.js'

app.post("/",(req,res)=>addClass(req,res))
app.get("/allClass",(req,res)=>displayClass(req,res))
app.get("/oneClass",(req,res)=>displayClassOne(req,res))
app.put("/class",(req,res)=>editClass(req,res))
app.delete("/deleteClass",(req,res)=>deleteClass(req,res))

app.post("/under",(req,res)=>addUnderClass(req,res))
app.get("/allUnderClass",(req,res)=>displayUnderClass(req,res))
app.get("/oneUnderClass",(req,res)=>displayUnderClassOne(req,res))
app.put("/under",(req,res)=>editUnderClass(req,res))
app.delete("/deleteUnder",(req,res)=>deleteUnderClass(req,res))

app.post("/item",(req,res)=>addItem(req,res))
app.get("/allItem",(req,res)=>displayItem(req,res))
app.get("/oneItem",(req,res)=>displayItemOne(req,res))
app.put("/item",(req,res)=>editItem(req,res))
app.delete("/deleteItem",(req,res)=>deleteItem(req,res))


app.listen(PORT, () => console.log(`👽 Server running on port ${PORT}`))