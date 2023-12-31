import axios from "axios";
import CryptoJS from "crypto-js";

export const uploadToCloud = async (image: string) => {
  const fd = new FormData();
  if (image.length <= 0) {
    alert("Nhập file ảnh");
    return;
  } else {
    fd.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    fd.append("file", image);
    fd.append("folder", "Blog");

    try {
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: fd,
        }
      );
      const data = await uploadResponse.json();
      return data;
    } catch (error) {
      console.error("Upload error:", error);
    }
  }
};

const generateSHA1 = (data: any) => {
  return CryptoJS.SHA1(data).toString();
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const deleteImageFromCloudinary = async (publicId: string) => {
  const timestamp = new Date().getTime();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiSecret = import.meta.env.VITE_API_SECRET;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));

  try {
    await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/destroy`,
      {
        public_id: publicId,
        signature,
        api_key: apiKey,
        timestamp,
      }
    );
  } catch (err) {
    console.error(err);
  }
};
