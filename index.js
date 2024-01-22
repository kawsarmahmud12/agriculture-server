const express = require('express');
const app = express();
const SSLCommerzPayment = require('sslcommerz-lts')
const cors = require('cors');
const port = process.env.PORT || 7000;

const categories = require('./data/data.json');
const chef = require('./data/AllData.json');
const insecticideData = require('./data/Insecticide.json')
const fertilizersData = require('./data/Fertilizers.json')
const seeds = require('./data/Seeds.json')

app.use(cors())

const corsConfig = {
    origin: ['https://delicate-cajeta-754e6b.netlify.app','http://localhost:5173'],
    credentials: true,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ]
}
// app.use(cors(corsConfig))
// app.options("", cors(corsConfig))

const store_id = '<your_store_id>'
const store_passwd = '<your_store_password>'
const is_live = false //true for live, false for sandbox

app.get('/', (req,res) => {
    res.send('food recipe server is running...')
})

app.get('/categories', (req,res) =>{
    res.send(categories);
})

app.get('/chef', (req,res) => {
    res.send(chef);
})

app.get('/chef/:id', (req, res) => {
    const id = req.params.id;
    const recipe = chef?.find(c => c.id == id);
    res.send(recipe);
})

app.get('/insecticideData', (req,res) => {
    res.send(insecticideData);
})

app.get('/insecticideData/:id', (req,res)=>{
    const id = req.params.id;
    const insecticideData = insecticide?.find(i => i.id == id);
    res.send(insecticideData);
})

app.get('/fertilizersData', (req,res) => {
    res.send(fertilizersData);
})

app.get('/fertilizersData/:id', (req,res)=>{
    const id = req.params.id;
    const fertilizersData = fertilizer?.find(f => f.id == id);
    res.send(fertilizersData);
})

app.get('/seeds', (req,res) => {
    res.send(seeds);
})

app.get('/seeds/:id', (req,res)=>{
    const id = req.params.id;
    const seeds = seeds?.find(s => s.id == id);
    res.send(seeds);
})

app.listen(port, () => {
    console.log(`agriculture API is running on port: ${port}`);
})