const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 7000;
const stripe = require('stripe')('sk_test_51ObOyLJOaqTt7bqvY3KT6VtSKa0EhusI1gLITjZfjulcA0anOQqq1Zk8w6uLXegDdyGXkdVaiA4JqWdyCgGRmqgs00T1OD9XgV');

const categories = require('./data/data.json');
const chef = require('./data/AllData.json');
const insecticideData = require('./data/Insecticide.json')
const fertilizersData = require('./data/Fertilizers.json')
const seeds = require('./data/Seeds.json')

app.use(cors())

const corsConfig = {
    origin: ['https://delicate-cajeta-754e6b.netlify.app', 'http://localhost:5173'],
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

// get home page

// app.post('/checkout', async(req,res) =>{
//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_type:["card"],
//             mode:"payment",
//             line_items: req.body.items.map(item => {
//                 return {
//                     price_data:{
//                         currency:"usd",
//                         product_data:{
//                             name:item.name
//                         },
//                         unit_amount:(item.price)*100,
//                     },
//                     quantity:item.quantity
//                 }
//             }),
//             success_url:"http://localhost:5173/checkout",
//             cancel_url: "http://localhost:5173/cancel",
//         })
//         res.json({url:session.url})
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }
// })

app.post('/payment', (req, res) => {

    const totalAmount = req.body.totalAmount;
    const token = req.body.token;


    stripe.customers.create({
        email: token.email,
        source: token.id
    })
        .then(customer => {
            stripe.charges.create({
                amount: totalAmount*1000,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email
            })
        }).then(result => res.status(200).send(result))
        .catch(error => console.error(error));
})

app.get('/', (req, res) => {
    res.send('food recipe server is running...')
})

app.get('/categories', (req, res) => {
    res.send(categories);
})

app.get('/chef', (req, res) => {
    res.send(chef);
})

app.get('/chef/:id', (req, res) => {
    const id = req.params.id;
    const recipe = chef?.find(c => c.id == id);
    res.send(recipe);
})

app.get('/insecticideData', (req, res) => {
    res.send(insecticideData);
})

app.get('/insecticideData/:id', (req, res) => {
    const id = req.params.id;
    const insecticideData = insecticide?.find(i => i.id == id);
    res.send(insecticideData);
})

app.get('/fertilizersData', (req, res) => {
    res.send(fertilizersData);
})

app.get('/fertilizersData/:id', (req, res) => {
    const id = req.params.id;
    const fertilizersData = fertilizer?.find(f => f.id == id);
    res.send(fertilizersData);
})

app.get('/seeds', (req, res) => {
    res.send(seeds);
})

app.get('/seeds/:id', (req, res) => {
    const id = req.params.id;
    const seeds = seeds?.find(s => s.id == id);
    res.send(seeds);
})

app.listen(port, () => {
    console.log(`agriculture API is running on port: ${port}`);
})