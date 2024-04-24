import express, { Request, Response } from 'express';
import { mongoLink } from './env';
import { mongoCheckStudentStatus, mongoConnect } from './mongoFiles';
import cors from 'cors';
import { sha256 } from './sha256';

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

mongoConnect(mongoLink)

app.post('/checkHash', async (req: Request, res: Response) => {
    const shaHash = sha256(req.body.hashVal);
    const dbResult = await mongoCheckStudentStatus(shaHash)
    console.log(shaHash)

    try{
      if (dbResult === "Not A Slot") res.status(401).json({ error : "Not a slot"})
      else if (dbResult === "Token not found in database") res.status(401).json({ error : "Token not found in database"})
      else if (dbResult === "Token Has Already Been Used") res.status(401).json({ error : "Token Has Already Been Used"})
      else res.status(200).json({EntryNo : dbResult})
    }
    catch(err){
      console.log(err)
      res.status(500).json({error : "Failed To Connect To Database"})
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
