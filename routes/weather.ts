import 'dotenv/config'
import express, { Request, Response, Router, Errback } from 'express'
import axios from 'axios'
const router: Router = express.Router()

const apiPath = (lat: string, lon: string) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.APPID}&units=metric&cnt=5`

router.get('/', async (req: Request, res: Response) => {
  const lat = req.query.lat as string
  const lon = req.query.lon as string
  const url = apiPath(lat, lon)
  if (!lat || !lon) {
    res.status(400)
    res.json({ error: 'Add query params lat and lon' })
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
