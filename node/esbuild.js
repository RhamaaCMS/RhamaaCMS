const esbuild = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const chokidar = require('chokidar');
const chalk = require('chalk');

// Shared build configuration
const buildConfig = {
  entryPoints: ['../static_src/js/main.js'],
  bundle: true,
  outfile: '../static_compiled/js/main.js',
  minify: true,
  sourcemap: true,
  target: ['es2015'],
  loader: {
    '.js': 'jsx',
  },
};

// Konfigurasi path
const TEMPLATES_DIR = [
  path.resolve(__dirname, '../Motify/templates/**/*.html'),
  path.resolve(__dirname, '../utils/templates/**/*.html'),
  path.resolve(__dirname, '../apps/**/templates/**/*.html')
];
const STATIC_SRC = path.resolve(__dirname, '../static_src');
const STATIC_COMPILED = path.resolve(__dirname, '../static_compiled');

// Copy directory recursively
const copyDir = (src, dest) => {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

// Copy static assets
const copyStaticAssets = () => {
  try {
    // Copy fonts
    copyDir('../static_src/fonts', '../static_compiled/fonts');
    console.log('Fonts copied successfully!');

    // Copy images
    copyDir('../static_src/images', '../static_compiled/images');
    console.log('Images copied successfully!');
  } catch (error) {
    console.error('Failed to copy static assets:', error);
    process.exit(1);
  }
};

// Watch static assets
const watchStaticAssets = () => {
  try {
    // Initial copy
    copyStaticAssets();

    // Watch fonts directory
    fs.watch('../static_src/fonts', { recursive: true }, (eventType, filename) => {
      console.log(`Detected ${eventType} in fonts: ${filename}`);
      copyDir('../static_src/fonts', '../static_compiled/fonts');
      console.log('Fonts updated!');
    });

    // Watch images directory
    fs.watch('../static_src/images', { recursive: true }, (eventType, filename) => {
      console.log(`Detected ${eventType} in images: ${filename}`);
      copyDir('../static_src/images', '../static_compiled/images');
      console.log('Images updated!');
    });

    console.log('Watching static assets...');
  } catch (error) {
    console.error('Failed to watch static assets:', error);
    process.exit(1);
  }
};

// SCSS and CSS build configuration
const buildCss = () => {
  try {
    // First compile SCSS to CSS
    const sassResult = sass.compile('../static_src/sass/main.scss', {
      style: 'compressed',
      sourceMap: true
    });

    // Create temp CSS file for Tailwind processing
    const tempCssPath = './temp-main.css';
    fs.writeFileSync(tempCssPath, sassResult.css);

    // Process with Tailwind
    execSync(`tailwindcss -i ${tempCssPath} -o ../static_compiled/css/main.css --minify`);

    // Clean up temp file
    fs.unlinkSync(tempCssPath);

    console.log('SCSS and CSS built successfully!');
  } catch (error) {
    console.error('CSS build failed:', error);
    process.exit(1);
  }
};

// Watch SCSS and CSS
const watchCss = () => {
  try {
    // Initial build
    buildCss();

    // Watch SCSS files
    fs.watch('../static_src/sass', { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.scss')) {
        console.log(`Detected ${eventType} in SCSS: ${filename}`);
        buildCss();
        console.log('SCSS rebuilt!');
      }
    });

    console.log('Watching SCSS files...');
  } catch (error) {
    console.error('CSS watch failed:', error);
    process.exit(1);
  }
};

// Fungsi untuk build assets
async function buildAssets() {
  try {
    const result = await esbuild.build({
      entryPoints: [`${STATIC_SRC}/js/main.js`],
      bundle: true,
      outdir: `${STATIC_COMPILED}/js`,
      sourcemap: true,
      minify: process.env.NODE_ENV === 'production',
      target: ['es2015'],
      loader: {
        '.js': 'jsx',
        '.svg': 'file',
        '.png': 'file',
        '.jpg': 'file',
        '.gif': 'file',
      },
    });

    console.log(chalk.green('✓ Assets built successfully'));
    return result;
  } catch (error) {
    console.error(chalk.red('× Build failed:'), error);
    process.exit(1);
  }
}

// Fungsi untuk watch mode
async function watchAssets() {
  // Watch templates
  const templateWatcher = chokidar.watch(TEMPLATES_DIR, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true
  });

  // Event handlers untuk templates
  templateWatcher
    .on('change', path => {
      const relativePath = path.replace(process.cwd(), '');
      console.log(chalk.yellow(`⟳ Template changed: ${relativePath}`));
      console.log(chalk.blue('  → Template changes detected, ready for refresh'));
    })
    .on('add', path => {
      const relativePath = path.replace(process.cwd(), '');
      console.log(chalk.green(`+ New template added: ${relativePath}`));
    })
    .on('unlink', path => {
      const relativePath = path.replace(process.cwd(), '');
      console.log(chalk.red(`- Template removed: ${relativePath}`));
    });

  // Watch dan build assets
  const ctx = await esbuild.context({
    entryPoints: [`${STATIC_SRC}/js/main.js`],
    bundle: true,
    outdir: `${STATIC_COMPILED}/js`,
    sourcemap: true,
    minify: false,
    target: ['es2015'],
    loader: {
      '.js': 'jsx',
      '.svg': 'file',
      '.png': 'file',
      '.jpg': 'file',
      '.gif': 'file',
    },
  });

  await ctx.watch();
  console.log(chalk.blue('👀 Watching for changes...'));
}

// Build function
async function build() {
  try {
    // Build JS
    await esbuild.build(buildConfig);
    console.log('JS built successfully!');
    
    // Build CSS
    buildCss();

    // Copy static assets
    copyStaticAssets();
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Watch function
async function watch() {
  try {
    // Watch JS
    const ctx = await esbuild.context(buildConfig);
    await ctx.watch();
    console.log('Watching JS files...');

    // Watch SCSS/CSS
    watchCss();

    // Watch static assets
    watchStaticAssets();

    // Watch templates
    watchAssets();
  } catch (error) {
    console.error('Watch failed:', error);
    process.exit(1);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--watch')) {
  watch();
} else {
  build();
}