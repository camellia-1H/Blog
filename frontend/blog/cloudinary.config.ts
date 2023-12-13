import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.CLOUD_NAME,
    },
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  });

export default cloudinary;