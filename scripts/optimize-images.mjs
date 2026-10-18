import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const imageNames = [
  'AyushBW11',
  'Sentinel',
  'attendly',
  'equityflow',
  'f1',
  'iplauction',
  'occasio',
];

const quality = 78;

const optimize = async (name) => {
  const input = `src/assets/images/${name}.png`;
  const output = `src/assets/images/${name}.webp`;
  const info = await sharp(input).webp({ quality, effort: 6 }).toFile(output);

  console.log(`${output} ${Math.round(info.size / 1024)} KB`);
};

await Promise.all(imageNames.map(optimize));

const previews = {
  occasio: 'src/assets/images/occasio.png',
  gridpulse: 'src/assets/images/f1.png',
  equityflow: 'src/assets/images/equityflow.png',
  attendly: 'src/assets/images/attendly.png',
  vector: 'src/assets/images/vector.png',
  sentinel: 'src/assets/images/Sentinel.png',
  'ipl-auction-arena': 'src/assets/images/iplauction.png',
  engram: 'src/assets/images/Engram.png',
  EngramDark: 'public/ProjectPreviews/EngramDark.png',
  EngramLight: 'public/ProjectPreviews/EngramLight.png',
  EquityflowDark: 'public/ProjectPreviews/EquityflowDark.png',
  EquityflowLight: 'public/ProjectPreviews/EquityflowLight.png',
  Talon: 'public/ProjectPreviews/Talon.png',
};

await mkdir('public/ProjectPreviews', { recursive: true });
for (const [name, input] of Object.entries(previews)) {
  for (const width of [480, 1200]) {
    const suffix = width === 480 ? '-480' : '';
    await sharp(input).resize({ width }).webp({ quality: 82, effort: 6 })
      .toFile(`public/ProjectPreviews/${name}${suffix}.webp`);
  }
}
await sharp('public/favicon.png').resize(224, 224).webp({ quality: 85, effort: 6 })
  .toFile('public/profile.webp');
await sharp('public/favicon.png').resize(32, 32).png().toFile('public/favicon-32x32.png');
await sharp('public/favicon.png').resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp('public/ResumeScreenshot.png').webp({ quality: 90, effort: 6 })
  .toFile('public/ResumeScreenshot.webp');
