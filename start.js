import dotenv from 'dotenv'
import app from './server.js'

dotenv.config({ path: './config/.env' })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server has started on port ${port}`)
})
