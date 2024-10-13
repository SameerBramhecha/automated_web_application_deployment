const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../src/index');  // Import the app directly

describe('Node.js Application', () => {

    it('should return the landing page with status 200', async () => {
        const res = await request(app).get('/home');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('<title>');  // Assuming 'index.ejs' contains a <title> tag
    });

    it('should return OK on /healthz endpoint', async () => {
        const res = await request(app).get('/healthz');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('OK');
    });

    it('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.statusCode).toBe(404);
    });

    it('should serve static files from the public directory', async () => {
        // Assuming there is a file `public/test.css` in your app
        const filePath = path.join(__dirname, '../public/test.css');
        fs.writeFileSync(filePath, 'body { background-color: red; }');  // Create a dummy file

        const res = await request(app).get('/test.css');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('background-color: red');

        fs.unlinkSync(filePath);  // Clean up the dummy file after the test
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

    // it('should start the server if run directly', () => {
    //     // Mock app.listen
    //     const listenSpy = jest.spyOn(app, 'listen');

    //     // Require the module to trigger the server start
    //     require('../src/index'); // This will execute the app.listen block

    //     expect(listenSpy).toHaveBeenCalledWith(process.env.PORT || 3000, expect.any(Function));
    //     expect(console.log).toHaveBeenCalledWith(`Server is running on http://localhost:${PORT}`);

    //     // Restore the original app.listen
    //     listenSpy.mockRestore();
    // });

});
