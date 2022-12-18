import 'dotenv/config'
import express, { Application } from 'express'
import cors from 'cors'
import WeatherRoute from './routes/weather'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/weather', WeatherRoute)

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}`)
)
