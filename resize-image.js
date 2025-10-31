// resize-images.js
import sharp from "sharp";
import fs from "fs";
import path from "path";

const images = ["Zuri.webp", "Contacts.webp"];
const inputDir = "./public/images";
const outputDir = "./public/images";

for (const img of images) {
  const input = path.join(inputDir, img);
  const base = img.replace(".webp", "");
  for (const size of [480, 800, 1200]) {
    sharp(input)
      .resize(size)
      .toFile(path.join(outputDir, `${base}-${size}.webp`))
      .then(() => console.log(`✅ Created ${base}-${size}.webp`))
      .catch((err) => console.error(`❌ Error on ${img}:`, err));
  }
}
