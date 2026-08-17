#!/usr/bin/env node
/**
 * Image Optimization Script
 *
 * Re-compresses WebP images in assets/images/ with better compression settings.
 * Quality: 75-85 (configurable via WEBP_QUALITY env var, default: 80)
 *
 * Usage:
 *   npm run optimize:images
 *   npm run optimize:images -- espectacles_my-slug
 *   npm run optimize:images -- hero_cover desktop/espectacles/espectacles_my-slug
 *   WEBP_QUALITY=75 npm run optimize:images
 *
 * Optional CLI args (after `--`) are substrings matched against each file's
 * path relative to assets/images/. When provided, only matching files run.
 * Prefer filters when adding new show images so unrelated assets are left alone.
 */

import sharp from 'sharp';
import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ImageStats {
  path: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
  savingsPercent: number;
}

/**
 * Recursively find all WebP files in a directory
 */
async function findWebPFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await findWebPFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith('.webp')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  
  return files;
}

/**
 * Optimize a single WebP image
 */
async function optimizeImage(
  filePath: string,
  quality: number
): Promise<ImageStats | null> {
  try {
    const originalBuffer = await readFile(filePath);
    const originalSize = originalBuffer.length;
    
    // Optimize the image with sharp
    const optimizedBuffer = await sharp(filePath)
      .webp({ 
        quality,
        effort: 6, // Higher effort = better compression (0-6, default 4)
        nearLossless: false,
        smartSubsample: true,
      })
      .toBuffer();
    
    const optimizedSize = optimizedBuffer.length;
    
    // Only overwrite if we actually saved space
    if (optimizedSize < originalSize) {
      const { writeFile } = await import('fs/promises');
      await writeFile(filePath, optimizedBuffer);
      
      const savings = originalSize - optimizedSize;
      const savingsPercent = (savings / originalSize) * 100;
      
      return {
        path: filePath,
        originalSize,
        optimizedSize,
        savings,
        savingsPercent,
      };
    } else {
      // Image is already optimized or got larger (shouldn't happen, but handle gracefully)
      return null;
    }
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
    return null;
  }
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Main function
 */
async function main() {
  const imagesDir = join(__dirname, '..', 'assets', 'images');
  const quality = parseInt(process.env.WEBP_QUALITY || '80', 10);
  const pathFilters = process.argv.slice(2).filter((arg) => arg !== '--');

  // Validate quality
  if (quality < 1 || quality > 100) {
    console.error('Error: WEBP_QUALITY must be between 1 and 100');
    process.exit(1);
  }

  console.log(`\n🖼️  Image Optimization Script`);
  console.log(`📁 Directory: ${imagesDir}`);
  console.log(`🎯 Quality: ${quality}`);
  if (pathFilters.length > 0) {
    console.log(`🔎 Filters: ${pathFilters.join(', ')}`);
  }
  console.log(`\n🔍 Finding WebP images...\n`);

  // Find all WebP files (optionally narrowed by path substring filters)
  const allWebpFiles = await findWebPFiles(imagesDir);
  const webpFiles =
    pathFilters.length === 0
      ? allWebpFiles
      : allWebpFiles.filter((filePath) => {
          const relativePath = filePath.slice(imagesDir.length + 1);
          return pathFilters.some((filter) => relativePath.includes(filter));
        });

  if (allWebpFiles.length === 0) {
    console.log('No WebP files found.');
    return;
  }

  if (webpFiles.length === 0) {
    console.log(
      `No WebP files matched the provided filter(s): ${pathFilters.join(', ')}`,
    );
    return;
  }

  console.log(
    pathFilters.length > 0
      ? `Found ${webpFiles.length} matching WebP file(s) of ${allWebpFiles.length} total.\n`
      : `Found ${webpFiles.length} WebP file(s) to optimize.\n`,
  );
  
  // Process images
  const results: ImageStats[] = [];
  let processed = 0;
  
  for (const filePath of webpFiles) {
    processed++;
    const relativePath = filePath.replace(imagesDir + '/', '');
    process.stdout.write(`[${processed}/${webpFiles.length}] Optimizing ${relativePath}... `);
    
    const result = await optimizeImage(filePath, quality);
    
    if (result) {
      results.push(result);
      console.log(
        `✓ Saved ${formatBytes(result.savings)} (${result.savingsPercent.toFixed(1)}%)`
      );
    } else {
      console.log('✓ Already optimized');
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Optimization Summary\n');
  
  if (results.length === 0) {
    console.log('All images are already optimized! 🎉');
  } else {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
    const totalSavings = totalOriginal - totalOptimized;
    const totalSavingsPercent = (totalSavings / totalOriginal) * 100;
    
    console.log(`✅ Optimized: ${results.length} file(s)`);
    console.log(`📦 Original size: ${formatBytes(totalOriginal)}`);
    console.log(`📦 Optimized size: ${formatBytes(totalOptimized)}`);
    console.log(`💾 Total savings: ${formatBytes(totalSavings)} (${totalSavingsPercent.toFixed(1)}%)`);
    
    // Show top 10 savings
    if (results.length > 0) {
      const topSavings = results
        .sort((a, b) => b.savings - a.savings)
        .slice(0, 10);
      
      console.log('\n🏆 Top savings:');
      topSavings.forEach((r, i) => {
        const relativePath = r.path.replace(imagesDir + '/', '');
        console.log(
          `  ${i + 1}. ${relativePath}: ${formatBytes(r.savings)} (${r.savingsPercent.toFixed(1)}%)`
        );
      });
    }
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});



