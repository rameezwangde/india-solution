import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');
const filesToConvert = ['hero-bg.png', 'about-us.png'];

async function convert() {
  for (const file of filesToConvert) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const outputPath = path.join(PUBLIC_DIR, file.replace('.png', '.webp'));

    if (fs.existsSync(inputPath)) {
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Successfully converted ${file} to WebP.`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    } else {
      console.error(`File not found: ${inputPath}`);
    }
  }
}

convert();
