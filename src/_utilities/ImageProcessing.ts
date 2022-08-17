import sharp, { ResizeOptions } from 'sharp';
import path from 'path';
import fs from 'fs';

const createThumb = async (
    image: Buffer,
    width: number,
    height: number,
    filename: string,
    other?: ResizeOptions
): Promise<Buffer> => {
    return new Promise((res, rej) => {
        sharp(image)
            .resize(width, height, other)
            .toBuffer(async (error, buffer) => {
                try {
                    const obj = new Object(other);
                    const options = Object.values(obj);
                    await fs.promises.writeFile(
                        `${path.resolve(
                            `./`
                        )}/assets/thumbs/${filename}_${width}_${height}_${options}.jpg`,
                        buffer
                    );
                    res(buffer);
                } catch (err) {
                    rej(err);
                }
            });
    });
};

export default createThumb;
