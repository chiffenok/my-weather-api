import 'dotenv/config'
import express, { Request, Response, Router } from 'express'
import axios from 'axios'
const router: Router = express.Router()

const apiPath = (q: string) =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${process.env.REACT_APP_APPID}`

router.get('/', async (req: Request, res: Response) => {
  const q = req.query.q as string
  const url = apiPath(q)
  if (!q) {
    res.status(400)
    res.json({ error: 'Add query params q' })
  }
  try {
    const response = await axios.get(url)
    res.json(response.data)
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status)
      res.json(error.response.data)
    }
    res.status(408)
    res.json(error.response.data)
  }
})

export default router
