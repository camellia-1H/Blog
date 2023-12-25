import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dwnfc0zdt',
  },
  // apiKey: process.env.API_KEY,
  // apiSecret: process.env.API_SECRET,
});

export default cloudinary;
