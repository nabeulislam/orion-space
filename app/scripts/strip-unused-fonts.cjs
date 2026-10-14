const fs = require('fs')
const path = require('path')

const cssPath = 'public/fonts/fonts.css'
const css = fs.readFileSync(cssPath, 'utf8')

const DROP = ['Archivo Black', 'Playfair Display']

// Split on @font-face blocks, keep everything else (comments/whitespace) as-is.
const blocks = css.split(/(?=@font-face\s*\{)/)
const kept = []
const dropped = []

for (const block of blocks) {
  const m = block.match(/@font-face\s*\{[\s\S]*?\}/)
  if (!m) {
    kept.push(block)
    continue
  }
  const family = (block.match(/font-family:\s*'([^']+)'/) || [])[1]
  if (family && DROP.includes(family)) dropped.push({ family, url: (block.match(/url\(([^)]+)\)/) || [])[1] })
  else kept.push(block)
}

fs.writeFileSync(cssPath, kept.join(''))

// Delete woff2 files no longer referenced anywhere in the stylesheet.
const referenced = new Set(
  [...fs.readFileSync(cssPath, 'utf8').matchAll(/url\(\/fonts\/([^)]+)\)/g)].map((m) => m[1]),
)
const files = fs.readdirSync('public/fonts').filter((f) => f.endsWith('.woff2'))
const removed = []
for (const f of files) {
  if (!referenced.has(f)) {
    fs.unlinkSync(path.join('public/fonts', f))
    removed.push(f)
  }
}

console.log('dropped faces:', dropped.length, dropped.map((d) => d.family).join(', '))
console.log('faces remaining:', (fs.readFileSync(cssPath, 'utf8').match(/@font-face/g) || []).length)
console.log('woff2 removed:', removed.length)
console.log('woff2 remaining:', fs.readdirSync('public/fonts').filter((f) => f.endsWith('.woff2')).length)
