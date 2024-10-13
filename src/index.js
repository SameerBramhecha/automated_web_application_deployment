const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Path to the views folder

// Serve static files like CSS from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Render the landing page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Health check route
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});
// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Internal Server Error');
// });

// Export the app without starting the server
module.exports = app;

// If this file is run directly, start the server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
