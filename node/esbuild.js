const esbuild = require('esbuild');
const { execSync, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
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

const ASSET_EXCLUDE_DIRS = new Set(['css', 'javascript']);

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

const removeIfExists = (target) => {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
};

// =============================================================================
// BUILD TASKS
// =============================================================================

const buildCSS = async () => {
  try {
    log.build('Building CSS...');

    // Ensure output directory exists
    const cssOutDir = path.join(PATHS.staticCompiled, 'css');
    ensureDir(cssOutDir);

    // Build with PostCSS (tailwindcss + autoprefixer, cssnano in production)
    const inputCssPath = path.join(PATHS.staticSrc, 'css', 'main.css');
    const outputCssPath = path.join(cssOutDir, 'main.css');

    // Use local postcss binary to be package-manager agnostic (pnpm/npm)
    const postcssBin = path.join(__dirname, 'node_modules', '.bin', process.platform === 'win32' ? 'postcss.cmd' : 'postcss');
    const postcssArgs = [
      inputCssPath,
      '--output',
      outputCssPath,
      '--config',
      path.join(__dirname, 'postcss.config.js'),
    ];

    if (!IS_PRODUCTION) {
      postcssArgs.push('--map');
    }

    execFileSync(postcssBin, postcssArgs, {
      stdio: 'inherit',
      cwd: __dirname,
      shell: true,
      env: {
        ...process.env,
        NODE_ENV: process.env.NODE_ENV || (IS_PRODUCTION ? 'production' : 'development'),
      },
    });

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
      },
      // Allow bundling node_modules
      external: [],
      // Resolve node_modules
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      // Add node_modules to resolve paths
      nodePaths: [path.join(__dirname, 'node_modules')]
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

    ensureDir(PATHS.staticCompiled);

    const entries = fs.readdirSync(PATHS.staticSrc, { withFileTypes: true });

    for (const entry of entries) {
      if (ASSET_EXCLUDE_DIRS.has(entry.name)) {
        continue;
      }

      const srcPath = path.join(PATHS.staticSrc, entry.name);
      const destPath = path.join(PATHS.staticCompiled, entry.name);

      if (entry.isDirectory()) {
        removeIfExists(destPath);
        copyDir(srcPath, destPath);
      } else {
        ensureDir(path.dirname(destPath));
        fs.copyFileSync(srcPath, destPath);
      }
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
  const cssWatcher = chokidar.watch(
    path.join(PATHS.staticSrc, 'css/**/*.css'),
    { ignoreInitial: true }
  );

  cssWatcher.on('all', (event, filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    log.info(`CSS ${event}: ${relativePath}`);
    buildCSS();
  });

  log.info('Watching CSS files...');
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
    },
    // Allow bundling node_modules
    external: [],
    // Resolve node_modules
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
    // Add node_modules to resolve paths
    nodePaths: [path.join(__dirname, 'node_modules')]
  };

  const ctx = await esbuild.context(config);
  await ctx.watch();
  log.info('Watching JavaScript files...');
};

const watchAssets = () => {
  const ignoredRoots = Array.from(ASSET_EXCLUDE_DIRS).map((dirName) =>
    path.join(PATHS.staticSrc, dirName)
  );

  const assetsWatcher = chokidar.watch(path.join(PATHS.staticSrc, '**/*'), {
    ignoreInitial: true,
    ignored: (filePath) => ignoredRoots.some((ignoredPath) => filePath.startsWith(ignoredPath))
  });

  assetsWatcher.on('all', (event, filePath) => {
    const relativePath = path.relative(process.cwd(), filePath);
    log.info(`Asset ${event}: ${relativePath}`);
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