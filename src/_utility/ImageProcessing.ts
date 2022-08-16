import sharp, { ResizeOptions } from 'sharp';
import path from 'path';
import fs from 'fs';

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
                        `${path.resolve(`./`)}/assets/thumbs/${filename}.jpg`,
                        buffer
                    );
                    res(buffer);
                } catch {
                    rej(error);
                }
            });
    });
};

export default createThumb;

