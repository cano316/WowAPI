const express = require('express');
const app = express();
const axios = require('axios').default;

// Get Home Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// Try to make the button get a random joke.
app.post('/', (req, res) => {
    axios.get('https://owen-wilson-wow-api.herokuapp.com/wows/random')
        .then(response => {
            const { data } = response;
            console.log(data);
            const { movie, year, poster, video } = data[0];
            res.write(`<head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"></head>`);
            res.write(`<h1>${movie} - (${year})</h1>`);
            res.write(`<img src="${poster}" width="300" class="mb-4"><br>`);
            res.write(`<video width="300" controls> <source src="${video['1080p']}">
        </video><br>`);
            res.write(`<a class="mt-3 btn btn-success" href="/">Back to Index</a>`)
            res.send();
        })
        .catch(e => console.log(e))
})

// Listen to Port 3000
app.listen(3000, function () {
    console.log('LISTENING ON PORT 3000')
})