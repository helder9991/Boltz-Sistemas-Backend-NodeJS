import 'reflect-metadata'
import app from './app'

app.listen(process.env.API_PORT, () => {
  console.log('🚀 Backend Started.')
})
