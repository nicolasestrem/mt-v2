import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, 'public', 'images', 'trailblazers');

// Get all image files
const files = fs.readdirSync(imagesDir).filter(file =>
  /\.(jpg|jpeg|png|JPG)$/i.test(file) && !file.includes('backup')
);

console.log(`Found ${files.length} images to optimize`);

// Process each image
for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const outputPath = path.join(imagesDir, file);

  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing ${file} (${metadata.width}x${metadata.height}, ${(metadata.size / 1024 / 1024).toFixed(2)} MB)`);

    // Resize and optimize
    await sharp(inputPath)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(outputPath + '.tmp');

    // Replace original
    fs.renameSync(outputPath + '.tmp', outputPath);

    const newMetadata = await sharp(outputPath).metadata();
    console.log(`✓ Optimized ${file}: ${(newMetadata.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
}

console.log('\nOptimization complete!');
