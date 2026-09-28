import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const docsJsonPath = path.join(rootDir, 'docs.json');
const docsDir = path.join(rootDir, 'docs');

console.log('🧪 Starting Mintlify docs.json Test Suite...\n');

let errorCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errorCount++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Validate docs.json existence and JSON syntax
assert(fs.existsSync(docsJsonPath), 'docs.json exists');

let config;
try {
  const raw = fs.readFileSync(docsJsonPath, 'utf-8');
  config = JSON.parse(raw);
  assert(true, 'docs.json is valid JSON');
} catch (err) {
  assert(false, `Failed to parse docs.json: ${err.message}`);
  process.exit(1);
}

// 2. Validate Required Top-Level Fields
assert(config.$schema === 'https://mintlify.com/docs.json', '$schema is set to https://mintlify.com/docs.json');
assert(typeof config.name === 'string' && config.name.length > 0, 'name is non-empty string');
assert(typeof config.theme === 'string' && config.theme.length > 0, 'theme is defined');

// 3. Validate Colors
assert(Boolean(config.colors), 'colors configuration is present');
if (config.colors) {
  const hexRegex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  assert(hexRegex.test(config.colors.primary), `colors.primary (${config.colors.primary}) is valid hex`);
  if (config.colors.light) {
    assert(hexRegex.test(config.colors.light), `colors.light (${config.colors.light}) is valid hex`);
  }
  if (config.colors.dark) {
    assert(hexRegex.test(config.colors.dark), `colors.dark (${config.colors.dark}) is valid hex`);
  }
}

// 4. Validate Asset Paths
function resolveAssetPath(assetUri) {
  if (!assetUri) return null;
  const rel = assetUri.startsWith('/') ? assetUri.slice(1) : assetUri;
  return path.join(rootDir, rel);
}

if (config.favicon) {
  const faviconPath = resolveAssetPath(typeof config.favicon === 'string' ? config.favicon : config.favicon.light);
  assert(fs.existsSync(faviconPath), `favicon file exists at ${faviconPath}`);
}

if (config.logo) {
  const logoLightPath = resolveAssetPath(typeof config.logo === 'string' ? config.logo : config.logo.light);
  const logoDarkPath = resolveAssetPath(typeof config.logo === 'string' ? config.logo : config.logo.dark);
  assert(fs.existsSync(logoLightPath), `logo.light exists at ${logoLightPath}`);
  assert(fs.existsSync(logoDarkPath), `logo.dark exists at ${logoDarkPath}`);
}

// 5. Validate Navigation Structure & Page Paths
assert(Boolean(config.navigation), 'navigation configuration is present');

const referencedPages = new Set();

function extractPages(node) {
  if (!node) return;
  if (typeof node === 'string') {
    referencedPages.add(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      extractPages(item);
    }
    return;
  }
  if (typeof node === 'object') {
    if (Array.isArray(node.pages)) {
      for (const p of node.pages) {
        extractPages(p);
      }
    }
    if (Array.isArray(node.groups)) {
      for (const g of node.groups) {
        extractPages(g);
      }
    }
    if (Array.isArray(node.tabs)) {
      for (const t of node.tabs) {
        extractPages(t);
      }
    }
  }
}

extractPages(config.navigation);
assert(referencedPages.size > 0, `navigation defines ${referencedPages.size} total page references`);

// Check that every referenced page exists on disk
for (const pageRef of referencedPages) {
  const pagePathMd = path.join(rootDir, `${pageRef}.md`);
  const pagePathMdx = path.join(rootDir, `${pageRef}.mdx`);
  const pagePathHtml = path.join(rootDir, `${pageRef}.html`);
  const exists = fs.existsSync(pagePathMd) || fs.existsSync(pagePathMdx) || fs.existsSync(pagePathHtml);
  assert(exists, `Page exists on disk: ${pageRef} (.md / .mdx)`);
}

// 6. Check that all files in docs/ are included in navigation
function getAllDocFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllDocFiles(full));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const relToRoot = path.relative(rootDir, full).replace(/\.(md|mdx)$/, '');
      files.push(relToRoot);
    }
  }
  return files;
}

const allDocFiles = getAllDocFiles(docsDir);
assert(allDocFiles.length >= 18, `Found ${allDocFiles.length} documentation files in docs/`);

let unreferencedCount = 0;
for (const docFile of allDocFiles) {
  if (!referencedPages.has(docFile)) {
    console.error(`⚠️ Unreferenced doc in docs.json: ${docFile}`);
    unreferencedCount++;
  }
}
assert(unreferencedCount === 0, `All ${allDocFiles.length} docs are mapped in docs.json navigation`);

// 7. Validate Navbar and Footer
if (config.navbar) {
  assert(Array.isArray(config.navbar.links) || Boolean(config.navbar.primary), 'navbar has links or primary CTA');
}

if (config.footer) {
  assert(Boolean(config.footer.socials) || Array.isArray(config.footer.links), 'footer has socials or links');
}

console.log('\n========================================');
if (errorCount === 0) {
  console.log('🎉 ALL MINTLIFY DOCS.JSON TESTS PASSED CLEANLY!\n');
  process.exit(0);
} else {
  console.error(`💥 ${errorCount} test(s) failed in docs.json.\n`);
  process.exit(1);
}
