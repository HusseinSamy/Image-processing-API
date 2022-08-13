import images from '../routes/api/images'
import supertest from 'supertest'

const request = supertest(images);

describe("Api endpoint tests suite", ()=> {
    it('expects to return OK', async() =>{
        const response = await request.get('/');
        expect(response.status).toBe(200);
    })
})