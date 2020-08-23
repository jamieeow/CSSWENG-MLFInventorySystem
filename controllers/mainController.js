const path = require('path');

const mainController = {
    //Render main page
    getMain: function(req, res, next){
        res.sendFile(path.join(__dirname + '/../views/main.html'));
    },
    
}

module.exports = mainController;