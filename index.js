const express = require('express')
const cors = require('cors')
const request = require('request')

/**
 * set envvar: OTHER_ALLOWED_ORIGINS=http://example.com,http://example2.com
 */
const OTHER_ALLOWED_ORIGINS = (process.env.OTHER_ALLOWED_ORIGINS && process.env.OTHER_ALLOWED_ORIGINS.split(',')) || []

const allowedOrigins = [
  'http://humanbrainproject.org',
  'https://humanbrainproject.org',
  'http://humanbrainproject.eu',
  'https://humanbrainproject.eu',
  ...OTHER_ALLOWED_ORIGINS
]

const corsConfig = {
  origin: (origin, cb) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'))
    }
  }
}



const app = express()
app.use(cors(corsConfig))

/**
 * e.g. http://example.com without trailing slash
 */
const PROXY_BYPASS_URL = process.env.PROXY_BYPASS_URL || `https://object.cscs.ch/v1/AUTH_6ebec77683fb472f94d352be92b5a577/Xiao`

app.get('/*', (req, res) => request(`${PROXY_BYPASS_URL}${req.url}`).pipe(res))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`application listening on port ${PORT}`))