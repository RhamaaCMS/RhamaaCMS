const esbuild = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const chokidar = require('chokidar');
const chalk = require('chalk');

// =============================================================================
// CONFIGURATION
// =============================================================================

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_WATCH = process.argv.includes('--watch');

const PATHS = {
  staticSrc: path.resolve(__dirname, '../static_src'),
  staticCompiled: path.resolve(__dirname, '../static_compiled'),
  templates: [
    path.resolve(__dirname, '../templates/**/*.html'),
    path.resolve(__dirname, '../utils/templates/**/*.html'),
    path.resolve(__dirname, '../apps/**/templates/**/*.html')
  ]
};

// =============================================================================
// UTILITIES
// =============================================================================

const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  build: (msg) => console.log(chalk.cyan('🔨'), msg)
};

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const copyDir = (src, dest) => {
  ensureDir(dest);
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

// =============================================================================
// BUILD TASKS
// =============================================================================

const buildCSS = async () => {
  try {
    log.build('Building CSS...');
    
    // Compile SCSS
    const sassResult = sass.compile(path.join(PATHS.staticSrc, 'sass/main.scss'), {
      style: IS_PRODUCTION ? 'compressed' : 'expanded',
      sourceMap: !IS_PRODUCTION,
      loadPaths: [path.join(PATHS.staticSrc, 'sass')]
    });

    // Ensure output directory exists
    ensureDir(path.join(PATHS.staticCompiled, 'css'));

    // Write temporary CSS file for Tailwind processing
    const tempCssPath = path.join(__dirname, 'temp-main.css');
    fs.writeFileSync(tempCssPath, sassResult.css);

    // Process with Tailwind
    const tailwindCmd = [
      'tailwindcss',
      `-i ${tempCssPath}`,
      `-o ${path.join(PATHS.staticCompiled, 'css/main.css')}`,
      IS_PRODUCTION ? '--minify' : ''
    ].filter(Boolean).join(' ');

    execSync(tailwindCmd, { stdio: 'inherit' });

    // Clean up temp file
    fs.unlinkSync(tempCssPath);

    log.success('CSS built successfully');
  } catch (error) {
    log.error('CSS build failed:');
    console.error(error);
    if (!IS_WATCH) process.exit(1);
  }
};

const buildJS = async () => {
  try {
    log.build('Building JavaScript...');

    // Check if main.js exists
    const jsEntryPoint = path.join(PATHS.staticSrc, 'javascript/main.js');
    if (!fs.existsSync(jsEntryPoint)) {
      log.warning('JavaScript entry point not found, skipping JS build');
      return;
    }

    const config = {
      entryPoints: [jsEntryPoint],
      bundle: true,
      outfile: path.join(PATHS.staticCompiled, 'js/main.js'),
      minify: IS_PRODUCTION,
      sourcemap: !IS_PRODUCTION,
      target: ['es2020'],
      format: 'iife',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.ts': 'ts',
        '.tsx': 'tsx'
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    };

    await esbuild.build(config);
    log.success('JavaScript built successfully');
  } catch (error) {
    log.error('JavaScript build failed:');
    console.error(error);
    if (!IS_WATCH) process.exit(1);
  }
};

const copyAssets = () => {
  try {
    log.build('Copying static assets...');

    // Copy fonts
    const fontsSource = path.join(PATHS.staticSrc, 'fonts');
    const fontsDest = path.join(PATHS.staticCompiled, 'fonts');
    if (fs.existsSync(fontsSource)) {
      copyDir(fontsSource, fontsDest);
      log.success('Fonts copied');
    }

    // Copy images
    const imagesSource = path.join(PATHS.staticSrc, 'images');
    const imagesDest = path.join(PATHS.staticCompiled, 'images');
    if (fs.existsSync(imagesSource)) {
      copyDir(imagesSource, imagesDest);
      log.success('Images copied');
    }

    log.success('Static assets copied successfully');
  } catch (error) {
    log.error('Failed to copy static assets:');
    console.error(error);
    if (!IS_WATCH) process.exit(1);
  }
};

// =============================================================================
// WATCH TASKS
// =============================================================================

const watchCSS = () => {
  const sassWatcher = chokidar.watch(
    path.join(PATHS.staticSrc, 'sass/**/*.scss'),
    { ignoreInitial: true }
  );

  sassWatcher.on('change', (filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    log.info(`SCSS changed: ${relativePath}`);
    buildCSS();
  });

  log.info('Watching SCSS files...');
};

const watchJS = async () => {
  const jsEntryPoint = path.join(PATHS.staticSrc, 'javascript/main.js');
  if (!fs.existsSync(jsEntryPoint)) {
    log.warning('JavaScript entry point not found, skipping JS watch');
    return;
  }

  const config = {
    entryPoints: [jsEntryPoint],
    bundle: true,
    outfile: path.join(PATHS.staticCompiled, 'js/main.js'),
    minify: false,
    sourcemap: true,
    target: ['es2020'],
    format: 'iife',
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.ts': 'ts',
      '.tsx': 'tsx'
    }
  };

  const ctx = await esbuild.context(config);
  await ctx.watch();
  log.info('Watching JavaScript files...');
};

const watchAssets = () => {
  // Watch fonts
  const fontsWatcher = chokidar.watch(
    path.join(PATHS.staticSrc, 'fonts/**/*'),
    { ignoreInitial: true }
  );

  fontsWatcher.on('all', (event, filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    log.info(`Font ${event}: ${relativePath}`);
    copyAssets();
  });

  // Watch images
  const imagesWatcher = chokidar.watch(
    path.join(PATHS.staticSrc, 'images/**/*'),
    { ignoreInitial: true }
  );

  imagesWatcher.on('all', (event, filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    log.info(`Image ${event}: ${relativePath}`);
    copyAssets();
  });

  log.info('Watching static assets...');
};

const watchTemplates = () => {
  const templateWatcher = chokidar.watch(PATHS.templates, {
    ignoreInitial: true,
    ignored: /(^|[/\\])\../
  });

  templateWatcher.on('change', (filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    log.info(`Template changed: ${relativePath}`);
    // Trigger CSS rebuild for Tailwind purging
    buildCSS();
  });

  log.info('Watching template files...');
};

// =============================================================================
// MAIN FUNCTIONS
// =============================================================================

const build = async () => {
  log.info('Starting build process...');
  
  // Ensure output directories exist
  ensureDir(path.join(PATHS.staticCompiled, 'css'));
  ensureDir(path.join(PATHS.staticCompiled, 'js'));
  
  // Run build tasks
  await Promise.all([
    buildCSS(),
    buildJS(),
    copyAssets()
  ]);
  
  log.success('Build completed successfully!');
};

const watch = async () => {
  log.info('Starting watch mode...');
  
  // Initial build
  await build();
  
  // Start watchers
  await Promise.all([
    watchJS(),
    watchCSS(),
    watchAssets(),
    watchTemplates()
  ]);
  
  log.success('Watch mode started. Watching for changes...');
};

// =============================================================================
// EXECUTION
// =============================================================================

const main = async () => {
  try {
    if (IS_WATCH) {
      await watch();
    } else {
      await build();
    }
  } catch (error) {
    log.error('Build process failed:');
    console.error(error);
    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', () => {
  log.info('Build process terminated');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log.info('Build process terminated');
  process.exit(0);
});

// Run main function
main();