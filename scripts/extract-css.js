#!/usr/bin/env node

/**
 * styles.js에서 CSS를 추출하여 styles.css 파일로 분리
 */

const fs = require('node:fs');
const path = require('node:path');

const stylesJsPath = path.join(__dirname, '..', 'src', 'ui', 'styles.js');
const stylesCssPath = path.join(__dirname, '..', 'src', 'ui', 'styles.css');

console.log('📝 Extracting CSS from styles.js...\n');

// styles.js 파일 읽기
const content = fs.readFileSync(stylesJsPath, 'utf8');

// export const STYLES = ` ... `; 에서 CSS 부분만 추출
const match = content.match(/export const STYLES = `([\s\S]*?)`;/);

if (!match) {
  console.error('❌ Failed to extract CSS from styles.js');
  process.exit(1);
}

const cssContent = match[1];

// styles.css에 저장
fs.writeFileSync(stylesCssPath, cssContent, 'utf8');

console.log('✅ CSS extracted successfully!');
console.log(`📄 Output: ${stylesCssPath}`);
console.log(`📊 Size: ${cssContent.length} characters`);
