const path = require('path');

const mainController = {
    //Render main page
    getMain: function(req, res, next){
        var details = {
            totalSold: 400,
            daysLeft: 2,
            hoursLeft: 11,
            foliosGiven: 400,
            artist: [{
                artistID: 1,
                artistName: "Artist 1"
            },
            {
                artistID: 2,
                artistName: "Artist 2"
            },
            {
                artistID: 3,
                artistName: "Artist 3"
            }],
            artistItems: [{
                artistID: 1,
                item: [{
                    itemID: 001,
                    itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                    itemName: "Item 1",
                    itemPrice: 5.00,
                    stocksQuantity: 20
                },{
                    itemID: 002,
                    itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                    itemName: "Item 2",
                    itemPrice: 5.00,
                    stocksQuantity: 20
                },{
                    itemID: 003,
                    itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                    itemName: "Item 3",
                    itemPrice: 5.00,
                    stocksQuantity: 20
                },{
                    itemID: 004,
                    itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                    itemName: "Item 2",
                    itemPrice: 5.00,
                    stocksQuantity: 20
                },{
                    itemID: 005,
                    itemPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWxMyKjtheIlC1HLrWeJMU4t4aynpeaJ-VlA&usqp=CAU",
                    itemName: "Item 3",
                    itemPrice: 5.00,
                    stocksQuantity: 20
                }]
            }]
        }

        res.render('main', details);
        // res.sendFile(path.join(__dirname + '/../views/main.html'));
    },

    postOrderCheckOut: function(req, res, next){
        res.redirect('/');
    },

    postRestock: function(req, res, next){
        res.redirect('/');
    },

    postReserve: function(req, res, next){
        res.redirect('/');
    },

    postPromo: function(req, res, next){
        res.redirect('/');
    },
    
}

module.exports = mainController;