const Parser = require('rss-parser');
const parser=new Parser();
const getNews = async(req, res) => {
    try{
        const result = await parser.parseURL(
            "https://feeds.feedburner.com/TheHackersNews"
        )
        res.json(result.items);
    }catch(e){
        console.log("error in parser ",e);
        res.status(500).json({
            message:"this is error in parse"
        })
    }
};

module.exports.getNews=getNews