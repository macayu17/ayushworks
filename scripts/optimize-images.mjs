import sharp from 'sharp';

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
