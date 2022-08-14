import express from 'express'
import {promises as fs} from 'fs'
import sharp, { ResizeOptions } from 'sharp'

const images = express.Router();

const createThumb = (image: Buffer, width: number, height: number, filename: string, other: ResizeOptions) => {
    sharp(image).resize(width,height,other).toBuffer((err, buffer) => {
        try{

            fs.writeFile(`C:/Users/Weshkl/Desktop/Image processing API/assets/thumbs/${filename}.jpg`, buffer);
        }
        catch (err){
            console.log(err)
        }

    })
}
 
images.get('/', async(req, res)=>{
    const {filename, width, height, ...other} = req.query; 
    const imagePath = `C:/Users/Weshkl/Desktop/Image processing API/assets/full/${filename}.jpg`
    const resizedImagePath = `C:/Users/Weshkl/Desktop/Image processing API/assets/thumbs/${filename}.jpg`
    const image: Buffer = await fs.readFile(imagePath);
    if(await fs.readFile(resizedImagePath))  
        res.sendFile(resizedImagePath);
    else{
        createThumb(image, +width!, +height!, filename! as string, other as ResizeOptions);
        res.sendFile(resizedImagePath);
    }
});

export default images;
