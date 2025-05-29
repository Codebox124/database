const fs = require('fs');
const csv = require('csvtojson');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfjm3z7es',
  api_key: '289265313536576',
  api_secret: 'TIJOZq8bvX-fp1ZNGiGqORgHpkM'
});

// Fetch all images from Cloudinary and create a mapping with display names
async function getCloudinaryImageMap() {
  try {
    console.log('🔍 Fetching images from Cloudinary...');

    let allResources = [];
    let nextCursor = null;

    // Fetch all images (handling pagination)
    do {
      const options = {
        type: 'upload',
        max_results: 500,
        resource_type: 'image'
      };

      if (nextCursor) {
        options.next_cursor = nextCursor;
      }

      const result = await cloudinary.api.resources(options);
      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;

      console.log(`📸 Fetched ${allResources.length} images so far...`);

    } while (nextCursor);

    console.log(`📋 Total images found: ${allResources.length}`);

    // Create mapping with multiple strategies - now storing display names
    const imageMap = {};
    allResources.forEach(resource => {
      const fullPublicId = resource.public_id;
      const displayName = resource.display_name || resource.public_id; // Use display_name if available

      // Strategy 1: Remove suffix (6-8 chars after last underscore)
      const withoutSuffix = fullPublicId.replace(/_[a-z0-9]{6,8}$/i, '');
      imageMap[withoutSuffix] = displayName;

      // Strategy 2: Remove extension from strategy 1
      const withoutExtension = withoutSuffix.replace(/\.[^/.]+$/, '');
      imageMap[withoutExtension] = displayName;

      // Strategy 3: Store full public_id as-is
      imageMap[fullPublicId] = displayName;

      // Strategy 4: Try different suffix lengths (sometimes it's longer/shorter)
      for (let i = 5; i <= 10; i++) {
        const pattern = new RegExp(`_[a-z0-9]{${i}}$`, 'i');
        if (pattern.test(fullPublicId)) {
          const alternative = fullPublicId.replace(pattern, '');
          imageMap[alternative] = displayName;
          imageMap[alternative.replace(/\.[^/.]+$/, '')] = displayName;
        }
      }

      console.log(`🔗 Mapping: ${withoutExtension} -> ${displayName}`);
    });

    console.log(`✅ Created ${Object.keys(imageMap).length} mapping entries`);

    // Debug: Show some mappings
    console.log('\n📝 Sample mappings:');
    Object.keys(imageMap).slice(0, 10).forEach(key => {
      console.log(`  ${key} -> ${imageMap[key]}`);
    });
    console.log('');

    return imageMap;

  } catch (error) {
    console.error('❌ Error fetching Cloudinary images:', error);
    return {};
  }
}

async function main() {
  // First, get the Cloudinary image mapping with display names
  const cloudinaryImageMap = await getCloudinaryImageMap();

  // Then process your CSV files
  console.log('📊 Processing CSV files...');
  const actors = await csv().fromFile('data/actors.csv');
  const movies = await csv().fromFile('data/movies.csv');
  const images = await csv().fromFile('data/images.csv');

  console.log(`📈 Processing ${actors.length} actors, ${movies.length} movies, ${images.length} images`);

  const actorMap = actors.map(actor => {
    const actorId = actor.ID;
    const actorMovies = movies
      .filter(movie => movie.Actor_ID === actorId)
      .map(movie => {
        const movieImages = images
          .filter(image => image.Movie_ID.toString() === movie.ID.toString())
          .map(image => {
            const originalName = image.Image_Name;
            console.log(`🔍 Looking for: ${originalName}`);

            // Transform the image name to match Cloudinary format
            const transformedName = transformToCloudinaryFormat(originalName);
            const nameWithoutExt = transformedName.replace(/\.[^/.]+$/, '');

            console.log(`  Transformed: ${transformedName}`);
            console.log(`  Without ext: ${nameWithoutExt}`);

            // Try multiple matching strategies
            let displayName = null;

            // Strategy 1: Exact match with extension
            if (cloudinaryImageMap[transformedName]) {
              displayName = cloudinaryImageMap[transformedName];
              console.log(`  ✅ Found (exact): ${displayName}`);
            }
            // Strategy 2: Match without extension
            else if (cloudinaryImageMap[nameWithoutExt]) {
              displayName = cloudinaryImageMap[nameWithoutExt];
              console.log(`  ✅ Found (no ext): ${displayName}`);
            }
            // Strategy 3: Case-insensitive search
            else {
              const lowerTransformed = transformedName.toLowerCase();
              const lowerWithoutExt = nameWithoutExt.toLowerCase();

              for (const [key, value] of Object.entries(cloudinaryImageMap)) {
                if (key.toLowerCase() === lowerTransformed || key.toLowerCase() === lowerWithoutExt) {
                  displayName = value;
                  console.log(`  ✅ Found (case-insensitive): ${displayName}`);
                  break;
                }
              }
            }

            // If still not found, this means the image doesn't exist in Cloudinary
            if (!displayName) {
              console.log(`  ❌ NOT FOUND in Cloudinary: ${originalName}`);
              displayName = ''; // ✅ Empty string fallback
            }

            console.log(`  📸 Final Display Name: ${displayName}\n`);

            // Return the display name instead of public ID
            return displayName;
          });

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

  fs.writeFileSync('data/actors.json', JSON.stringify(actorMap, null, 2), 'utf8');
  console.log('✅ actors.json generated with Cloudinary display names!');
}

// Transform filename to Cloudinary format
function transformToCloudinaryFormat(filename) {
  if (!filename) return filename;

  return filename
    .replace(/\s+/g, '_')    // Replace spaces with underscores
    .replace(/[()]/g, '_')   // Replace parentheses with underscores
    .replace(/[&]/g, '_')    // Replace & with underscores
    .replace(/['"]/g, '_')   // Replace quotes with underscores
    .replace(/[-]/g, '_')    // Replace hyphens with underscores
    .replace(/_{2,}/g, '_')  // Replace multiple underscores with single
    .replace(/^_|_$/g, '');  // Remove leading/trailing underscores
}

// Helper function to clean text with encoding issues
function cleanText(text) {
  if (!text) return text;

  return text
    .replace(/�/g, "'")
    .replace(/�/g, " ")
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