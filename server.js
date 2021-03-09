const app = require('./app');

// Start the Server

const port = 3000;

app.listen(port, () => {
  console.log(`Natours server is up and running on ${port}...`);
});
