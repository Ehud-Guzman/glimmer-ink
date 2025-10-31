import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/images"; // adjust as needed
const outputDir = "./public/images";
const targetWidth = 800;
const quality = 80;

const processImages = async () => {
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, path.parse(file).name + ".webp");
    if (/\.(png|jpg|jpeg|webp)$/i.test(file)) {
      try {
        await sharp(inputPath)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .webp({ quality })
          .toFile(outputPath);
        console.log(`✅ Optimized: ${file}`);
      } catch (err) {
        console.error(`❌ Error with ${file}:`, err);
      }
    }
  }
};

processImages();
