/*
GreenerX build script

Purpose:
- Build the public/ directory from src/
- Keep the build process explicit and predictable
*/

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");


function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyPages(from, to) {
  if (!fs.existsSync(from)) return;

  fs.mkdirSync(to, { recursive: true });
  for (const item of fs.readdirSync(from)) {
    const srcPath = path.join(from, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyPages(srcPath, path.join(to, item));
      continue;
    }

    if (path.extname(item) === ".html") {
      if (item === "index.html" || item === "404.html") {
        fs.copyFileSync(srcPath, path.join(to, item));
      } else {
        const name = path.basename(item, ".html");
        const pageDir = path.join(to, name);

        fs.mkdirSync(pageDir, { recursive: true });
        fs.copyFileSync(srcPath, path.join(pageDir, "index.html"));
      }
    }
  }
}

function copyNews(from, to) {
  if (!fs.existsSync(from)) return;

  const languages = fs.readdirSync(from);
  
  for (const lang of languages) {
    const langSrc = path.join(from, lang);
    if (!fs.statSync(langSrc).isDirectory()) continue;

    const targetDir = path.join(to, lang, "insights");
    fs.mkdirSync(targetDir, { recursive: true });

    for (const item of fs.readdirSync(langSrc)) {
      const srcPath = path.join(langSrc, item);
      const destPath = path.join(targetDir, item);

      if (fs.statSync(srcPath).isDirectory()) {
        copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

function copyDirectory(from, to) {
  if (!fs.existsSync(from)) return;

  fs.mkdirSync(to, { recursive: true });
  for (const item of fs.readdirSync(from)) {
    const srcPath = path.join(from, item);
    const destPath = path.join(to, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(from, to) {
  if (!fs.existsSync(from)) return;

  fs.copyFileSync(from, to);
}


console.log(" 1. Cleaning public/");
cleanDir(PUBLIC);

console.log(" 2. Copying pages/");
copyPages(path.join(SRC, "pages"), PUBLIC);

console.log(" 3. Copying news/");
copyNews(path.join(SRC, "news"), PUBLIC);

console.log(" 4. Copying other directories");
const DIR_WHITELIST = [
  "assets"
];
for (const dirName of DIR_WHITELIST) {
  const srcDir = path.join(SRC, dirName);

  if (dirName === "pages") {
    copyPages(srcDir, path.join(PUBLIC, dirName));
  } else {
    copyDirectory(srcDir, path.join(PUBLIC, dirName));
  }
}

console.log(" 5. Copying files");
const FILE_WHITELIST = [
  "index.html",
];
for (const fileName of FILE_WHITELIST) {
  copyFile(
    path.join(SRC, fileName),
    path.join(PUBLIC, fileName)
  );
}

console.log("✅  Build completed");
