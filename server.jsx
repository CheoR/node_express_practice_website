const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
 res.send('Hola Cola Express Shop');
});

app.listen(PORT, () => {
 console.log(`Express server listenting on port ${PORT}`);
});
