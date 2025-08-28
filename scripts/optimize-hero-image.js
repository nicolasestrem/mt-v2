import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const INPUT_IMAGE = 'public/images/about/fernsehturm-berlin.jpg';
const OUTPUT_DIR = 'public/images/about';

async function optimizeImage() {
  console.log('Starting image optimization...');
  
  const inputPath = path.join(process.cwd(), INPUT_IMAGE);
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`Original image: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);
  
  // Generate WebP versions
  const sizes = [
    { width: 400, suffix: 'small' },
    { width: 800, suffix: 'medium' },
    { width: 1200, suffix: 'large' },
    { width: 1920, suffix: 'xlarge' }
  ];
  
  // Create WebP versions with different sizes
  for (const size of sizes) {
    const outputPath = path.join(
      process.cwd(), 
      OUTPUT_DIR, 
      `fernsehturm-berlin-${size.suffix}.webp`
    );
    
    await image
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);
      
    const stats = await fs.stat(outputPath);
    console.log(`Created ${size.suffix} WebP: ${size.width}w, ${(stats.size / 1024).toFixed(1)}KB`);
  }
  
  // Create optimized JPEG fallback versions
  for (const size of sizes) {
    const outputPath = path.join(
      process.cwd(), 
      OUTPUT_DIR, 
      `fernsehturm-berlin-${size.suffix}.jpg`
    );
    
    await image
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);
      
    const stats = await fs.stat(outputPath);
    console.log(`Created ${size.suffix} JPEG: ${size.width}w, ${(stats.size / 1024).toFixed(1)}KB`);
  }
  
  // Create a highly optimized full-size WebP
  const fullWebPPath = path.join(process.cwd(), OUTPUT_DIR, 'fernsehturm-berlin-optimized.webp');
  await image
    .webp({ 
      quality: 80,
      effort: 6
    })
    .toFile(fullWebPPath);
    
  const fullStats = await fs.stat(fullWebPPath);
  console.log(`Created optimized full-size WebP: ${(fullStats.size / 1024).toFixed(1)}KB`);
  
  console.log('\n✅ Image optimization complete!');
}

optimizeImage().catch(console.error);