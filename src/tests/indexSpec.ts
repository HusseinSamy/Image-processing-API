import app from '../index';
import supertest from 'supertest';
import fs from 'fs';
import path from 'path'

import createThumb from '../_utilities/ImageProcessing';

const request = supertest(app);

describe('API endpoint tests suite', () => {
    describe('Status Codes tests', () => {
        it('expects to return 400', async () => {
            const response = await request.get('/api/images?filename=fjord');
            expect(response.status).toBe(400);
        });
        it('expects to return 200', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=500&height=500'
            );
            expect(response.status).toBe(200);
        });
    });

    describe('Error testing', () => {
        it('expects to return error', async () => {
            const response = await request.get('/api/images?filename=fjords');
            expect(response.error !== false).toBeTrue();
        });
        it('expects to return error', async () => {
            const response = await request.get('/api/images?filename=fjord');
            expect(response.error !== false).toBeTrue();
        });
        it('expects to return params error', async () => {
            const response = await request.get('/api/images?filename=fjord');
            expect(
                response.text ===
                    `Please use the right query paramaters ----> filename=[fileName]&width=[photoWidth]&height=[photoHeight]`
            ).toBeTrue();
        });
        it('expects not to return specific error', async () => {
            const response = await request.get(
                '/api/images?filename=fjord&width=500&height=500'
            );
            expect(response.error !== false).not.toBeTrue();
        });
        it('expects to return wrong name error', async () => {
            const response = await request.get('/api/images?filename=fjords');
            expect(
                response.text === `This photo doesn't exist on our server`
            ).toBeTrue();
        });
    });
    describe('Image processing tests', () => {
        it ('expects to be resolved', async() => {
            const image: Buffer = await fs.promises.readFile(`${path.resolve('./')}/assets/full/fjord.jpg`);
            expectAsync(createThumb(image, 100, 100, 'fjord')).toBeResolved;
        }) 
        it ('expects to be rejected', async() => {
            let image: unknown;
            expectAsync(createThumb(image as Buffer, 100, 100, 'fjords')).toBeRejected;
        }) 
    })
});
