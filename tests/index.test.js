const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const express = require('express');
const path = require('path');
let app;

describe('Node.js Application', () => {
    // Before each test, require the app from the main file
    beforeEach(() => {
        app = require('../src/index');
    });

    it('should return the landing page with status 200', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // Optionally, check the content of the response
                expect(res.text).to.contain('<title>'); // Assuming your 'index.ejs' file has a <title> tag
                done();
            });
    });

    it('should return OK on /healthz endpoint', (done) => {
        request(app)
            .get('/healthz')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal('OK');
                done();
            });
    });

    it('should handle 404 errors for unknown routes', (done) => {
        request(app)
            .get('/unknown-route')
            .expect(404, done);
    });

    it('should handle server errors properly', (done) => {
        // Simulate an internal server error by throwing an error in a route
        app.get('/error', (req, res) => {
            throw new Error('Simulated error');
        });

        request(app)
            .get('/error')
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal('Internal Server Error');
                done();
            });
    });
});
