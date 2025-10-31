import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/images";
const outputDir = "./public/images";
const maxWidth = 800; // adjust to your site layout (e.g., hero images might need 1600)
const quality = 80;

for (const file of fs.readdirSync(inputDir)) {
  const ext = path.extname(file).toLowerCase();
  if ([".webp", ".png", ".jpg", ".jpeg", ".avif"].includes(ext)) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    try {
      await sharp(inputPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .toFile(outputPath);
      console.log(`✅ Resized: ${file}`);
    } catch (err) {
      console.log(`❌ Error resizing ${file}:`, err.message);
    }
  }
}
