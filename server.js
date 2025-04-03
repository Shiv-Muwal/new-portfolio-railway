import app from "./app.js";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
app.use(fileUpload({ useTempFiles: true }));

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening at port ${process.env.PORT}`)
})
