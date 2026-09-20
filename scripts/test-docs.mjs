import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');

console.log('🧪 Starting MTVL Docs Test Suite...\n');

let errorCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errorCount++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Collect all doc files
function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const docFiles = getFiles(docsDir);
assert(docFiles.length >= 18, `Found ${docFiles.length} documentation pages (expected >= 18)`);

// 2. Validate frontmatter in all docs
for (const file of docFiles) {
  const relPath = path.relative(docsDir, file);
  const content = fs.readFileSync(file, 'utf-8');

  const hasFrontmatter = content.startsWith('---') && content.indexOf('---', 3) !== -1;
  assert(hasFrontmatter, `${relPath} has valid frontmatter delimiter`);

  const hasTitle = /title:\s*.+/i.test(content);
  assert(hasTitle, `${relPath} has non-empty 'title' field`);

  const hasId = /id:\s*.+/i.test(content);
  assert(hasId, `${relPath} has non-empty 'id' field`);
}

// 3. Validate Sidebar configuration
const sidebarsPath = path.join(rootDir, 'sidebars.js');
assert(fs.existsSync(sidebarsPath), 'sidebars.js exists');

// 4. Validate Docusaurus config
const docusaurusConfigPath = path.join(rootDir, 'docusaurus.config.js');
assert(fs.existsSync(docusaurusConfigPath), 'docusaurus.config.js exists');

// 5. Test Build verification
console.log('\n📦 Running Docusaurus Build & Link Integrity Check...');
try {
  const buildOutput = execSync('npm run build', {
    cwd: rootDir,
    encoding: 'utf-8',
    stdio: 'pipe',
  });
  assert(true, 'Docusaurus build succeeded with 0 errors');
  assert(fs.existsSync(path.join(rootDir, 'build', 'index.html')), 'Build output contains build/index.html');
} catch (err) {
  console.error(err.stdout || err.stderr || err.message);
  assert(false, `Docusaurus build failed: ${err.message}`);
}

console.log(`\n========================================`);
if (errorCount === 0) {
  console.log('🎉 ALL DOCS TESTS PASSED CLEANLY!');
  process.exit(0);
} else {
  console.error(`💥 ${errorCount} test(s) failed.`);
  process.exit(1);
}
