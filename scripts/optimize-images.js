#!/usr/bin/env node

/**
 * Image Optimization Script for MobilityTrailblazers Astro Site
 * 
 * This script optimizes images for the project by:
 * - Converting to WebP format
 * - Resizing to appropriate dimensions
 * - Compressing for optimal file size
 * - Organizing into proper directories
 * 
 * Usage:
 * 1. Place raw images in ./raw-images/
 * 2. Run: node scripts/optimize-images.js
 * 3. Optimized images will be saved to ./public/images/
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  inputDir: './raw-images/',
  outputDir: './public/images/',
  quality: 85,
  maxWidth: 1920,
  maxHeight: 1920,
  formats: ['jpg', 'jpeg', 'png', 'webp']
};

// Image type configurations
const imageTypes = {
  logo: {
    width: 110,
    height: 110,
    quality: 90,
    format: 'webp'
  },
  ogImage: {
    width: 1200,
    height: 630,
    quality: 90,
    format: 'jpg'
  },
  background: {
    width: 1920,
    height: 1080,
    quality: 85,
    format: 'webp'
  },
  jury: {
    width: 300,
    height: 300,
    quality: 90,
    format: 'webp'
  },
  linkedin: {
    width: 1200,
    height: 630,
    quality: 85,
    format: 'jpg'
  },
  icon: {
    width: 64,
    height: 64,
    quality: 95,
    format: 'svg'
  }
};

/**
 * Detect image type based on filename or directory
 */
function detectImageType(filename) {
  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes('logo')) return 'logo';
  if (lowerFilename.includes('og') || lowerFilename.includes('social')) return 'ogImage';
  if (lowerFilename.includes('background') || lowerFilename.includes('bg')) return 'background';
  if (lowerFilename.includes('jury') || lowerFilename.includes('profile')) return 'jury';
  if (lowerFilename.includes('linkedin') || lowerFilename.includes('social')) return 'linkedin';
  if (lowerFilename.includes('icon') || lowerFilename.includes('svg')) return 'icon';
  
  // Default to background for unknown types
  return 'background';
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputPath, imageType) {
  try {
    const config = imageTypes[imageType];
    
    console.log(`Optimizing: ${path.basename(inputPath)} -> ${imageType} format`);
    
    let sharpInstance = sharp(inputPath);
    
    // Resize if dimensions are specified
    if (config.width && config.height) {
      sharpInstance = sharpInstance.resize(config.width, config.height, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: true
      });
    }
    
    // Apply format-specific optimizations
    switch (config.format) {
      case 'webp':
        await sharpInstance
          .webp({ quality: config.quality })
          .toFile(outputPath);
        break;
        
      case 'jpg':
        await sharpInstance
          .jpeg({ quality: config.quality, progressive: true })
          .toFile(outputPath);
        break;
        
      case 'png':
        await sharpInstance
          .png({ quality: config.quality, progressive: true })
          .toFile(outputPath);
        break;
        
      case 'svg':
        // For SVG, just copy the file
        fs.copyFileSync(inputPath, outputPath);
        break;
        
      default:
        await sharpInstance
          .webp({ quality: config.quality })
          .toFile(outputPath);
    }
    
    // Get file sizes for comparison
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(inputStats.size / 1024).toFixed(1)}KB -> ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

/**
 * Process all images in a directory
 */
async function processDirectory(inputDir, outputDir) {
  if (!fs.existsSync(inputDir)) {
    console.log(`📁 Creating input directory: ${inputDir}`);
    fs.mkdirSync(inputDir, { recursive: true });
    console.log(`⚠️  Please add images to ${inputDir} and run the script again`);
    return;
  }
  
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    config.formats.some(format => 
      file.toLowerCase().endsWith(`.${format}`)
    )
  );
  
  if (imageFiles.length === 0) {
    console.log(`📁 No image files found in ${inputDir}`);
    console.log(`Supported formats: ${config.formats.join(', ')}`);
    return;
  }
  
  console.log(`🖼️  Found ${imageFiles.length} image(s) to optimize`);
  console.log('');
  
  // Create output directories
  const outputDirs = [
    outputDir,
    path.join(outputDir, 'jury'),
    path.join(outputDir, 'linkedin'),
    path.join(outputDir, 'icons'),
    path.join(outputDir, 'uploads'),
    path.join(outputDir, 'uploads/nominations')
  ];
  
  outputDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const imageType = detectImageType(file);
    const config = imageTypes[imageType];
    
    // Determine output path based on image type
    let outputPath;
    switch (imageType) {
      case 'jury':
        outputPath = path.join(outputDir, 'jury', file.replace(/\.[^/.]+$/, `.${config.format}`));
        break;
      case 'linkedin':
        outputPath = path.join(outputDir, 'linkedin', file.replace(/\.[^/.]+$/, `.${config.format}`));
        break;
      case 'icon':
        outputPath = path.join(outputDir, 'icons', file.replace(/\.[^/.]+$/, `.${config.format}`));
        break;
      default:
        outputPath = path.join(outputDir, file.replace(/\.[^/.]+$/, `.${config.format}`));
    }
    
    await optimizeImage(inputPath, outputPath, imageType);
  }
  
  console.log('');
  console.log('🎉 Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${outputDir}`);
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 MobilityTrailblazers Image Optimizer');
  console.log('=====================================');
  console.log('');
  
  try {
    await processDirectory(config.inputDir, config.outputDir);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
