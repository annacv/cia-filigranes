#!/usr/bin/env node
/**
 * Prepare robots.txt for build
 * 
 * Swaps robots.txt based on PREVIEW environment variable
 * - PREVIEW=true: Uses robots-preview.txt (blocks all)
 * - PREVIEW=false or unset: Uses robots-production.txt (allows search engines, blocks AI)
 * 
 * Usage:
 *   PREVIEW=true npm run generate
 *   npm run generate (production)
 */

import { copyFile, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');

const isPreview = process.env.PREVIEW === 'true';

async function prepareRobots() {
  try {
    const sourceFile = isPreview 
      ? join(publicDir, 'robots-preview.txt')
      : join(publicDir, 'robots-production.txt');
    
    const targetFile = join(publicDir, 'robots.txt');
    
    // Copy the appropriate robots.txt file
    await copyFile(sourceFile, targetFile);
    
    if (isPreview) {
      console.log('✓ Using robots-preview.txt (blocks all crawlers)');
    } else {
      console.log('✓ Using robots-production.txt (allows search engines, blocks AI)');
    }
  } catch (error) {
    console.error('Error preparing robots.txt:', error);
    process.exit(1);
  }
}

prepareRobots();

