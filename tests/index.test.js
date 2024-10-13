const request = require('supertest');
const app = require('../src/index');  // Import the app directly

describe('Node.js Application', () => {
    it('should return the landing page with status 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('<title>');  // Adjust according to your actual HTML content
    });

    it('should return OK on /healthz endpoint', async () => {
        const res = await request(app).get('/healthz');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('OK');
    });

    it('should handle 404 errors for unknown routes', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.statusCode).toBe(404);
    });

    // it('should handle server errors properly', async () => {
    //     // Simulate an internal server error by throwing an error in a route
    //     app.get('/error', (req, res) => {
    //         throw new Error('Simulated error');
    //     });

    //     const res = await request(app).get('/error');
    //     expect(res.statusCode).toBe(500);
    //     expect(res.text).toBe('Internal Server Error');
    // });
});
