import app from '../index'
import supertest from 'supertest'

const request = supertest(app);

describe("API endpoint tests suite", ()=> {
    it('expects to return 200', async(done) =>{
        const response = await request.get('/api/images?filename=fjord');
        console.log(response);        
        expect(response.status).toBe(200);
        done();
    });

   
})