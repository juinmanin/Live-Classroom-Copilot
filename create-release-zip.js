#!/usr/bin/env node

/**
 * Script to create a ZIP file for public distribution
 * This packages all necessary source files while excluding build artifacts and dependencies
 */

import { createWriteStream, existsSync, mkdirSync, statSync, readdirSync } from 'fs';
import { join, relative, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  'dist',
  'dist-ssr',
  '.git',
  '.vscode',
  '.idea',
  'release'
];

// File extensions to exclude
const EXCLUDE_EXTENSIONS = [
  '.log',
  '.local'
];

const OUTPUT_DIR = 'release';
const OUTPUT_FILENAME = 'live-classroom-copilot-source.zip';

/**
 * Check if a file or directory should be excluded
 */
function shouldExclude(filePath) {
  const parts = filePath.split('/');
  
  // Check if any directory in the path matches exclude list
  for (const dir of EXCLUDE_DIRS) {
    if (parts.includes(dir)) {
      return true;
    }
  }
  
  // Check if file extension should be excluded
  for (const ext of EXCLUDE_EXTENSIONS) {
    if (filePath.endsWith(ext)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dir, baseDir = dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const relativePath = relative(baseDir, filePath);
    
    if (shouldExclude(relativePath)) {
      return;
    }
    
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, baseDir, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Create the ZIP file
 */
async function createZip() {
  console.log('🚀 Starting ZIP creation for public distribution...\n');
  
  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const outputPath = join(OUTPUT_DIR, OUTPUT_FILENAME);
  const output = createWriteStream(outputPath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });
  
  // Handle stream events
  output.on('close', () => {
    const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log(`\n✅ ZIP file created successfully!`);
    console.log(`📦 File: ${outputPath}`);
    console.log(`📊 Size: ${sizeInMB} MB`);
    console.log(`📄 Total bytes: ${archive.pointer()}`);
  });
  
  archive.on('error', (err) => {
    throw err;
  });
  
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn('Warning:', err);
    } else {
      throw err;
    }
  });
  
  // Pipe archive data to the file
  archive.pipe(output);
  
  // Get all files to include
  const files = getAllFiles(__dirname);
  const projectName = basename(__dirname);
  
  console.log(`📁 Adding files to ZIP:\n`);
  
  // Add files to archive
  let fileCount = 0;
  for (const file of files) {
    const relativePath = relative(__dirname, file);
    const archivePath = join(projectName, relativePath);
    
    console.log(`   ✓ ${relativePath}`);
    archive.file(file, { name: archivePath });
    fileCount++;
  }
  
  console.log(`\n📊 Total files added: ${fileCount}`);
  console.log('\n⏳ Finalizing ZIP file...');
  
  // Finalize the archive
  await archive.finalize();
  
  return new Promise((resolve, reject) => {
    output.on('close', resolve);
    output.on('error', reject);
  });
}

// Run the script
createZip().catch(err => {
  console.error('❌ Error creating ZIP file:', err);
  process.exit(1);
});
