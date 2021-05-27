const app = require('./app')
const { logger } = require('./helpers/logger.helper')

app.listen(process.env.PORT || 8080)

logger.info(`Server listening on port ${process.env.PORT || 8080}`)
