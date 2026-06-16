import sharp from "sharp";

const input = "public/logo.png";
const output = "public/logo.png";

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

// Sample background color from top-left corner pixel
const BG_R = pixels[0];
const BG_G = pixels[1];
const BG_B = pixels[2];
console.log(`Background color sampled: rgb(${BG_R}, ${BG_G}, ${BG_B})`);

// Flood-fill from all 4 corners to find connected background pixels
const TOLERANCE = 22;
const visited = new Uint8Array(width * height);
const queue = [];

function colorDist(i) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
  return Math.sqrt((r - BG_R) ** 2 + (g - BG_G) ** 2 + (b - BG_B) ** 2);
}

function enqueue(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const idx = y * width + x;
  if (visited[idx]) return;
  const pixIdx = idx * channels;
  if (colorDist(pixIdx) > TOLERANCE) return;
  visited[idx] = 1;
  queue.push([x, y]);
}

// Seed from all 4 corners
enqueue(0, 0);
enqueue(width - 1, 0);
enqueue(0, height - 1);
enqueue(width - 1, height - 1);

// BFS flood fill
while (queue.length > 0) {
  const [x, y] = queue.shift();
  const pixIdx = (y * width + x) * channels;
  pixels[pixIdx + 3] = 0; // make transparent

  enqueue(x + 1, y);
  enqueue(x - 1, y);
  enqueue(x, y + 1);
  enqueue(x, y - 1);
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log("Done — background removed from", output);
