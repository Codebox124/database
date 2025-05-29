const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const IMAGES_DIR = path.join('public', 'images'); 

function getLocalImageMap() {
  const files = fs.readdirSync(IMAGES_DIR);
  const imageMap = {};

  files.forEach(file => {
    const fileName = file;
    const fileWithoutExt = file.replace(/\.[^/.]+$/, '');
    const withoutSuffix = fileWithoutExt.replace(/_[a-z0-9]{6,8}$/i, '');

    imageMap[withoutSuffix] = fileName;
    imageMap[fileWithoutExt] = fileName;
    imageMap[fileName] = fileName;

    for (let i = 5; i <= 10; i++) {
      const pattern = new RegExp(`_[a-z0-9]{${i}}$`, 'i');
      if (pattern.test(fileWithoutExt)) {
        const alt = fileWithoutExt.replace(pattern, '');
        imageMap[alt] = fileName;
        imageMap[alt.replace(/\.[^/.]+$/, '')] = fileName;
      }
    }
  });

  console.log(`🖼️ Mapped ${Object.keys(imageMap).length} local images`);
  return imageMap;
}

async function main() {
  const localImageMap = getLocalImageMap();

  const actors = await csv().fromFile('data/actors.csv');
  const movies = await csv().fromFile('data/movies.csv');
  const images = await csv().fromFile('data/images.csv');

  const actorMap = actors.map(actor => {
    const actorId = actor.ID;
    const actorMovies = movies
      .filter(movie => movie.Actor_ID === actorId)
      .map(movie => {
        const movieImages = images
          .filter(image => image.Movie_ID.toString() === movie.ID.toString())
          .map(image => {
            const originalName = image.Image_Name;
            
            // Try to find the image in localImageMap
            let fileName = localImageMap[originalName];
            
            if (!fileName) {
              // Try without extension
              const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
              fileName = localImageMap[nameWithoutExt];
            }
            
            if (!fileName) {
              console.log(`❌ NOT FOUND locally: ${originalName}`);
              return '';
            }

            console.log(`✅ FOUND: ${originalName} -> ${fileName}`);
            return `/images/${fileName}`;
          })
          .filter(path => path !== ''); // Remove empty paths

        return {
          title: movie.Movie_Name,
          year: movie.Movie_Release_Year,
          description: cleanText(movie.Brief_Description_of_Movie),
          images: movieImages
        };
      });

    return {
      ID: actor.ID,
      Actor_Name: cleanText(actor.Actor_Name),
      Legal_First_Name: cleanText(actor.Legal_First_Name),
      Legal_Last_Name: cleanText(actor.Legal_Last_Name),
      Birth_Date: actor.Birth_Date,
      Death_Date: actor.Death_Date,
      Name_First_Movie: cleanText(actor.Name_First_Movie),
      Year_First_Movie: actor.Year_First_Movie,
      Total_Movies: actorMovies.length,
      Movies: actorMovies,
    };
  });

  fs.writeFileSync('data/act.json', JSON.stringify(actorMap, null, 2), 'utf8');
  console.log('✅ actors.json generated with /images/ paths for Next.js!');
}

function cleanText(text) {
  if (!text) return text;

  return text
    .replace(/�/g, "'")
    .replace(/[\u0080-\u00ff]/g, match => {
      const latinMap = {
        '�': "'",
        '�': ' ',
        '�': '–',
        '�': '"',
        '�': '"'
      };
      return latinMap[match] || match;
    });
}

main().catch(console.error);