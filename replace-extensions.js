import fs from "fs";
import path from "path";

const rootDir = "./src"; // or wherever your components live

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  const newContent = content
    .replace(/\.png/g, ".webp")
    .replace(/\.jpg/g, ".webp")
    .replace(/\.jpeg/g, ".webp");
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`🔁 Updated: ${filePath}`);
  }
};

const walk = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (/\.(js|jsx|ts|tsx|html)$/.test(filePath)) {
      replaceInFile(filePath);
    }
  });
};

walk(rootDir);
