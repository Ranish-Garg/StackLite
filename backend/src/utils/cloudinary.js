import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const uploadoncloudinary = async (localfilepath) => {
   const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })

  console.log("fileuploaded on cloudinary");

  fs.unlinkSync(localfilepath);
 
  return response;
};

export {uploadoncloudinary}












