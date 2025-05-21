const fs = require('fs');
const csv = require('csvtojson');

async function main() {
  const actors = await csv().fromFile('data/actors.csv');
  const movies = await csv().fromFile('data/movies.csv');
  // Add the images CSV file
  const images = await csv().fromFile('data/images.csv');

  const actorMap = actors.map(actor => {
    const actorId = actor.ID; // from Actor file
    const actorMovies = movies
      .filter(movie => movie.Actor_ID === actorId)
      .map(movie => {
        // Find images associated with this movie
        const movieImages = images
          .filter(image => image.Movie_ID.toString() === movie.ID.toString())
          .map(image => image.Image_Name);

        return {
          title: movie.Movie_Name,
          year: movie.Movie_Release_Year,
          // Fix encoding issues by replacing or normalizing text
          description: cleanText(movie.Brief_Description_of_Movie),
          // Add images array to each movie
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

  // Use a proper encoding when writing the file
  fs.writeFileSync('data/actors.json', JSON.stringify(actorMap, null, 2), 'utf8');
  console.log('✅ actors.json generated with proper encoding!');
}

// Helper function to clean text with encoding issues
function cleanText(text) {
  if (!text) return text;
  
  // Replace common encoding issues
  return text
    .replace(/�/g, " ") // Replace � with apostrophe
    .replace(/�/g, " ") // Replace � with space
    .replace(/[\u0080-\u00ff]/g, match => {
      // Map common Latin-1 characters to their ASCII equivalents
      const latinMap = {
        '�': "", // apostrophe
        '�': ' ', // space
        '�': '', // dash
        '�': ' ', // quotes
        '�': ' ' // quotes
      };
      return latinMap[match] || match;
    });
}

main();