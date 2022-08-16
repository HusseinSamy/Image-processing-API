import express from 'express';
import fs from 'fs';
import path from 'path'
import createThumb from '../../_utility/ImageProcessing';

const images = express.Router();

images.get('/', async (req, res) => {
    const { filename, width, height, ...other } = req.query;
    const imagePath = `${path.resolve(`./`)}/assets/full/${filename}.jpg`;
    const resizedImagePath = `${path.resolve(`./`)}/assets/thumbs/${filename}.jpg`;
    try {
        if (fs.existsSync(imagePath)) {
            if (
                filename !== undefined &&
                width !== undefined &&
                height !== undefined
            ) {
                if (fs.existsSync(resizedImagePath)) {
                    res.status(200);
                    res.sendFile(resizedImagePath);
                } else {
                    const image: Buffer = await fs.promises.readFile(imagePath);
                    await createThumb(
                        image,
                        +width,
                        +height,
                        filename as string,
                        other
                    )
                        .then(() => {
                            res.status(200);
                            res.sendFile(resizedImagePath);
                        })
                        .catch((err) => {
                            res.send(err);
                            throw err;
                        });
                }
            } else {
                res.status(400);
                throw new Error(
                    `Please use the right query paramaters ----> filename=[fileName]&width=[photoWidth]&height=[photoHeight]`
                );
            }
        } else {
            res.status(404);
            throw new Error(`This photo doesn't exist on our server`);
        }
    } catch (err) {
        res.send((err as Error).message);
        return err;
    }
});

export default images;
