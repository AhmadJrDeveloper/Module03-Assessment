import  express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import articleRouter from './routes/articleRoute.js'
import userRouter from './routes/userRoute.js';

dotenv.config()
const app = express();

var corOptions = {
  origin: 'http://localhost:80'
}

//middleware
app.use(cors(corOptions));

app.use(express.json())

app.use(express.urlencoded({ extended: true}))


//middlewear function//

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//testing api
app.get("/",(req, res) =>{
  res.json({message:'hello from api'})
})


app.listen (process.env.PORT ,()=>{
    console.log("server listening on port", process.env.PORT);
})

app.use('/api/articles',articleRouter);
app.use('/api/users',userRouter);

