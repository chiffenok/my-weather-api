import 'dotenv/config'
import express, { Application } from 'express'
import cors from 'cors'

import GeoRoute from './routes/geo'
import WeatherRoute from './routes/weather'

const app: Application = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://chiffenok-weather-app.onrender.com',
    ],
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/weather', WeatherRoute)
app.use('/api/geo', GeoRoute)

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}`)
)
