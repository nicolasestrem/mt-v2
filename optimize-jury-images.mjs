import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(__dirname, 'Photos with Consent');
const targetDir = path.join(__dirname, 'public', 'images', 'jury');

// Mapping of source photos to target jury member names
const juryPhotoMappings = [
  { source: 'Peter Grünenfelder.jpeg', target: 'Peter Grünenfelder.webp' },
  { source: 'Kjell Gruner.jpg', target: 'Dr. Kjell Gruner.webp' },
  { source: 'Philipp Rösler.jpeg', target: 'Dr. Philipp Rösler.webp' },
  { source: 'Johann Jungwirth.jpeg', target: 'Johann Jungwirth.webp' },
  { source: 'Laura Meyer.jpeg', target: 'Laura Meyer.webp' }
];

console.log(`\n📸 Jury Photo Optimization Script`);
console.log(`Source: ${sourceDir}`);
console.log(`Target: ${targetDir}\n`);

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`✓ Created target directory: ${targetDir}\n`);
}

// Process each jury photo
for (const mapping of juryPhotoMappings) {
  const inputPath = path.join(sourceDir, mapping.source);
  const outputPath = path.join(targetDir, mapping.target);

  if (!fs.existsSync(inputPath)) {
    console.log(`✗ Source photo not found: ${mapping.source}`);
    continue;
  }

  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing ${mapping.source}`);
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${(metadata.size / 1024).toFixed(2)} KB`);

    // Resize and optimize to WebP
    await sharp(inputPath)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const newMetadata = await sharp(outputPath).metadata();
    console.log(`  ✓ Optimized: 400x400, ${(newMetadata.size / 1024).toFixed(2)} KB`);
    console.log(`  → ${mapping.target}\n`);
  } catch (error) {
    console.error(`✗ Error processing ${mapping.source}:`, error.message);
  }
}

console.log('✅ Jury photo optimization complete!\n');
