// tests/index.test.js

const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
    res.send('Hello from Node.js Microservice!');
});

describe('GET /', () => {
    it('should return hello message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello from Node.js Microservice!');
    });
});
