const fs = require('fs');
const csv = require('csvtojson');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfjm3z7es',
  api_key: '289265313536576',
  api_secret: 'TIJOZq8bvX-fp1ZNGiGqORgHpkM'
});

// Fetch all images from Cloudinary and create a mapping
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
    
    // Create mapping with multiple strategies
    const imageMap = {};
    allResources.forEach(resource => {
      const fullPublicId = resource.public_id;
      
      // Strategy 1: Remove suffix (6-8 chars after last underscore)
      const withoutSuffix = fullPublicId.replace(/_[a-z0-9]{6,8}$/i, '');
      imageMap[withoutSuffix] = fullPublicId;
      
      // Strategy 2: Remove extension from strategy 1
      const withoutExtension = withoutSuffix.replace(/\.[^/.]+$/, '');
      imageMap[withoutExtension] = fullPublicId;
      
      // Strategy 3: Store full public_id as-is
      imageMap[fullPublicId] = fullPublicId;
      
      // Strategy 4: Try different suffix lengths (sometimes it's longer/shorter)
      for (let i = 5; i <= 10; i++) {
        const pattern = new RegExp(`_[a-z0-9]{${i}}$`, 'i');
        if (pattern.test(fullPublicId)) {
          const alternative = fullPublicId.replace(pattern, '');
          imageMap[alternative] = fullPublicId;
          imageMap[alternative.replace(/\.[^/.]+$/, '')] = fullPublicId;
        }
      }
      
      console.log(`🔗 Mapping: ${withoutExtension} -> ${fullPublicId}`);
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
  // First, get the Cloudinary image mapping
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
            let actualPublicId = null;
            
            // Strategy 1: Exact match with extension
            if (cloudinaryImageMap[transformedName]) {
              actualPublicId = cloudinaryImageMap[transformedName];
              console.log(`  ✅ Found (exact): ${actualPublicId}`);
            }
            // Strategy 2: Match without extension
            else if (cloudinaryImageMap[nameWithoutExt]) {
              actualPublicId = cloudinaryImageMap[nameWithoutExt];
              console.log(`  ✅ Found (no ext): ${actualPublicId}`);
            }
            // Strategy 3: Case-insensitive search
            else {
              const lowerTransformed = transformedName.toLowerCase();
              const lowerWithoutExt = nameWithoutExt.toLowerCase();
              
              for (const [key, value] of Object.entries(cloudinaryImageMap)) {
                if (key.toLowerCase() === lowerTransformed || key.toLowerCase() === lowerWithoutExt) {
                  actualPublicId = value;
                  console.log(`  ✅ Found (case-insensitive): ${actualPublicId}`);
                  break;
                }
              }
            }
            
            // If still not found, this means the image doesn't exist in Cloudinary
            if (!actualPublicId) {
              console.log(`  ❌ NOT FOUND in Cloudinary: ${originalName}`);
              actualPublicId = transformedName; // Keep as fallback but warn
            }
            
            // The actualPublicId from Cloudinary already includes the suffix and extension
            const finalName = actualPublicId;
            console.log(`  📸 Final: ${finalName}\n`);
            
            return finalName;
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
  console.log('✅ actors.json generated with Cloudinary image names!');
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