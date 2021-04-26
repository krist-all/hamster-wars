const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');
const matchWinners = require('./routes/matchWinners.js')
const winners = require('./routes/winners.js');
const losers = require('./routes/losers.js');

const PORT = process.env.PORT || 1337;
const staticFolder = path.join(__dirname, 'static');

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.params);
    next();
})

app.use(express.static(staticFolder));

app.use('/hamsters', hamsters);

app.use('/matches', matches);

app.use('/matchWinners', matchWinners);

app.use('/winners', winners);

app.use('/losers', losers);

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});