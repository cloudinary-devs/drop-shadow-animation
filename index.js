// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath, index) => {

    index += 10;
    // Set the public ID so that they're in the right order
    const options = {
      public_id: "car" + index,
      folder: "docs/dropshadow",
      tags: "car-dropshadow",
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
};

//////////////////
//
// Main function
//
//////////////////
(async () => {

    let az = [90,80,70,60,50,40,30,20,10,0,350,340,330,320,310,300,290,280,270];
    let el = [0,10,20,30,40,50,60,70,80,90,80,70,60,50,40,30,20,10,0];
    let spr = [5,10,15,20,25,35,55,70,80,90,80,70,55,35,25,20,15,10,5];

    for (let i=0; i<az.length; i++) {
        // Set the image to upload
        const imagePath = 'https://res.cloudinary.com/demo/image/upload/e_dropshadow:azimuth_' + az[i] + ';elevation_' + el[i] + ';spread_' + spr[i] + '/docs/rmv_bgd/car-png';

         // Upload the image
        await uploadImage(imagePath, i);
    }

    try {
      // Create the animation
      const result = await cloudinary.uploader.multi('car-dropshadow', {format: 'png'});
      console.log(result);
    } catch (error) {
      console.error(error);
    }

})();