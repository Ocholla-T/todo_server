import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello from the other side');
});

const PORT = 3000;

app.listen(PORT, () => `app has started on port ${PORT}`);
