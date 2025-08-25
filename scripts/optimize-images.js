import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function optimizeImages() {
  const imageDir = path.join(__dirname, '../src/assets/images')
  const outputDir = path.join(__dirname, '../public/optimized-images')
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  try {
    const files = fs.readdirSync(imageDir)
    
    for (const file of files) {
      if (/\.(png|jpe?g|webp)$/i.test(file)) {
        const inputPath = path.join(imageDir, file)
        const outputName = file.replace(/\.(png|jpe?g)$/i, '.webp')
        const outputPath = path.join(outputDir, outputName)
        
        await sharp(inputPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath)
        
        console.log(`Optimized: ${file} → ${outputName}`)
      }
    }
    
    console.log('All images optimized successfully!')
  } catch (error) {
    console.error('Error optimizing images:', error)
  }
}

optimizeImages()