import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Starting Infrastructure & Docker Test Suite...\n');

let errorCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errorCount++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// ==========================================
// 1. Makefile Verification
// ==========================================
console.log('📋 Testing Makefile...');
const makefilePath = path.join(rootDir, 'Makefile');
assert(fs.existsSync(makefilePath), 'Makefile exists');

if (fs.existsSync(makefilePath)) {
  const makefileContent = fs.readFileSync(makefilePath, 'utf-8');
  const expectedTargets = [
    'all',
    'help',
    'install',
    'start',
    'build',
    'serve',
    'test',
    'clean',
    'docker-build',
    'docker-buildx-builder',
    'docker-buildx',
    'docker-buildx-push',
    'docker-run'
  ];

  for (const target of expectedTargets) {
    const hasTarget = new RegExp(`^${target}:`, 'm').test(makefileContent);
    assert(hasTarget, `Makefile defines target '${target}'`);
  }

  assert(makefileContent.includes('docker/Dockerfile'), 'Makefile references docker/Dockerfile');

  // Verify Makefile dry-run execution
  try {
    execSync('make -n test build docker-build docker-buildx', {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    assert(true, 'Makefile dry-run (make -n) executes with valid syntax');
  } catch (err) {
    assert(false, `Makefile dry-run failed: ${err.message}`);
  }
}

// ==========================================
// 2. Docker Directory & Dockerfile Verification
// ==========================================
console.log('\n🐳 Testing Docker configs in docker/ directory...');
const dockerDir = path.join(rootDir, 'docker');
assert(fs.existsSync(dockerDir) && fs.statSync(dockerDir).isDirectory(), 'docker/ directory exists');

const dockerfilePath = path.join(dockerDir, 'Dockerfile');
assert(fs.existsSync(dockerfilePath), 'docker/Dockerfile exists');

if (fs.existsSync(dockerfilePath)) {
  const dockerContent = fs.readFileSync(dockerfilePath, 'utf-8');

  assert(dockerContent.includes('FROM --platform=$BUILDPLATFORM node:22-alpine AS builder') || dockerContent.includes('AS builder'), 'docker/Dockerfile contains builder stage');
  assert(dockerContent.includes('FROM nginx:alpine AS runner') || dockerContent.includes('FROM nginx:alpine'), 'docker/Dockerfile contains Nginx runner stage');
  assert(dockerContent.includes('npm run build'), 'docker/Dockerfile runs static build step');
  assert(dockerContent.includes('COPY docker/nginx.conf /etc/nginx/conf.d/default.conf'), 'docker/Dockerfile copies docker/nginx.conf to nginx conf.d');
  assert(dockerContent.includes('COPY --from=builder /app/build /usr/share/nginx/html'), 'docker/Dockerfile copies build artifacts to web root');
  assert(dockerContent.includes('EXPOSE 80'), 'docker/Dockerfile exposes port 80');
  assert(dockerContent.includes('HEALTHCHECK'), 'docker/Dockerfile defines container healthcheck');
}

// ==========================================
// 3. .dockerignore Verification
// ==========================================
console.log('\n🚫 Testing .dockerignore...');
const dockerignoreInDocker = path.join(dockerDir, '.dockerignore');
const dockerignoreInRoot = path.join(rootDir, '.dockerignore');
assert(fs.existsSync(dockerignoreInDocker), 'docker/.dockerignore exists');
assert(fs.existsSync(dockerignoreInRoot), '.dockerignore exists at root');

if (fs.existsSync(dockerignoreInDocker)) {
  const ignoreContent = fs.readFileSync(dockerignoreInDocker, 'utf-8');
  const requiredIgnores = ['node_modules', 'build', '.docusaurus', '.git'];
  for (const item of requiredIgnores) {
    assert(ignoreContent.includes(item), `docker/.dockerignore excludes '${item}'`);
  }
}

// ==========================================
// 4. Nginx Configuration Verification
// ==========================================
console.log('\n🌐 Testing docker/nginx.conf...');
const nginxPath = path.join(dockerDir, 'nginx.conf');
assert(fs.existsSync(nginxPath), 'docker/nginx.conf exists');

if (fs.existsSync(nginxPath)) {
  const nginxContent = fs.readFileSync(nginxPath, 'utf-8');
  assert(nginxContent.includes('listen 80;'), 'docker/nginx.conf listens on port 80');
  assert(nginxContent.includes('try_files'), 'docker/nginx.conf configures try_files for SPA routes');
  assert(nginxContent.includes('gzip on;'), 'docker/nginx.conf enables gzip compression');
}

// ==========================================
// 5. GitHub Actions Workflow Verification
// ==========================================
console.log('\n⚙️ Testing GitHub Actions Workflow...');
const workflowPath = path.join(rootDir, '.github', 'workflows', 'ci.yml');
assert(fs.existsSync(workflowPath), '.github/workflows/ci.yml exists');

if (fs.existsSync(workflowPath)) {
  const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
  assert(workflowContent.includes('file: ./docker/Dockerfile'), 'CI workflow specifies file: ./docker/Dockerfile');
  assert(workflowContent.includes('platforms: linux/amd64,linux/arm64'), 'CI workflow specifies multi-platform: linux/amd64,linux/arm64');
  assert(workflowContent.includes('docker/setup-qemu-action'), 'CI workflow sets up QEMU');
  assert(workflowContent.includes('docker/setup-buildx-action'), 'CI workflow sets up Docker Buildx');
  assert(workflowContent.includes('docker/build-push-action'), 'CI workflow uses docker/build-push-action');
  assert(workflowContent.includes('ghcr.io'), 'CI workflow targets GitHub Container Registry');
}

console.log('\n========================================');
if (errorCount === 0) {
  console.log('🎉 ALL INFRASTRUCTURE TESTS PASSED CLEANLY!\n');
  process.exit(0);
} else {
  console.error(`💥 ${errorCount} infrastructure test(s) failed.\n`);
  process.exit(1);
}
