import express, { Express, Request, Response} from 'express';
import router from './api/routes';

const app: Express = express();

app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response)=> {
  res.send("Hello, world!");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})