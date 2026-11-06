const http = require('http')
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..', 'out')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  const candidates = []
  if (clean.endsWith('/')) candidates.push(path.join(root, clean, 'index.html'))
  else {
    candidates.push(path.join(root, clean))
    candidates.push(path.join(root, clean + '.html'))
    candidates.push(path.join(root, clean, 'index.html'))
  }
  return candidates.find((file) => file.startsWith(root) && fs.existsSync(file) && fs.statSync(file).isFile())
}

http
  .createServer((req, res) => {
    const file = resolve(req.url)
    if (!file) {
      const notFound = path.join(root, '404.html')
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      fs.createReadStream(notFound).pipe(res)
      return
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  .listen(4173, () => console.log('preview on http://localhost:4173'))
