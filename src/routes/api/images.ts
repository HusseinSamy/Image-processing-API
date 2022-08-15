import express from 'express';
import fs from 'fs';
import sharp, { ResizeOptions } from 'sharp';

const images = express.Router();

const createThumb = async (
    image: Buffer,
    width: number,
    height: number,
    filename: string,
    other: ResizeOptions
): Promise<Buffer> => {
    return new Promise((res, rej) => {
        sharp(image)
            .resize(width, height, other)
            .toBuffer(async (error, buffer) => {
                try {
                    await fs.promises.writeFile(
                        `C:/Users/Weshkl/Desktop/Image processing API/assets/thumbs/${filename}.jpg`,
                        buffer
                    );
                    res(buffer);
                } catch {
                    rej(error);
                }
            });
    });
};

images.get('/', async (req, res) => {
    const { filename, width, height, ...other } = req.query;
    const imagePath = `C:/Users/Weshkl/Desktop/Image processing API/assets/full/${filename}.jpg`;
    const resizedImagePath = `C:/Users/Weshkl/Desktop/Image processing API/assets/thumbs/${filename}.jpg`;
    try {
        if (fs.existsSync(imagePath)) {
            if (fs.existsSync(resizedImagePath)) {
                res.sendFile(resizedImagePath);
            } else {
                if (
                    filename !== undefined &&
                    width !== undefined &&
                    height !== undefined
                ) {
                    const image: Buffer = await fs.promises.readFile(imagePath);
                    await createThumb(
                        image,
                        +width,
                        +height,
                        filename as string,
                        other
                    )
                        .then(() => {
                            res.sendFile(resizedImagePath);
                        })
                        .catch((err) => {
                            res.send(err);
                            throw err;
                        });
                } else {
                    throw `Please use the right query paramaters.     filename=[fileName]  width=[photoWidth]  height=[photoHeight]`;
                }
            }
        } else throw `This photo doesn't exist on our server`;
    } catch (err) {
        res.send(err);
    }
});

export default images;
