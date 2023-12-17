const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
app.use(cors({
  origin: [
    'https://snowboardingdays.com',
  'https://surfboard-volume.netlify.app'
]
}));
app.use(express.json())

app.post("/",async (req,res)=>{
    let url = req.body.url;
    let data = await webScraper(url)
    if(data=="Hmm...We Have 0 Results"){

        res.send(false)
    }else{
        res.send(true)

    }

})

app.get("/",async (req,res)=>{
    res.send("Not Allowed")

})

async function webScraper(url) {

    let text;
    await axios(url).then(async (response) => {
        const html_data = await response.data;
        const $ =  cheerio.load(html_data);

        let ele = $('h1')
        ele = ele.text()
        text = ele
    });

    return text;
};


app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    } else {
        console.log('Server not started ' + error);
    }

});

