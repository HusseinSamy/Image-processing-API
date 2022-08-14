import express from 'express'
import {promises as fs} from 'fs'

const images = express.Router();

// const createThumb = (image) => {

// }

images.get('/', (req, res)=>{
    try
    {
        res.sendFile(`C:/Users/Weshkl/Desktop/Image processing API/assets/full/${req.query.filename}.jpg`);
    }
    catch (err) {
        res.send(err)
    }

});

export default images;
