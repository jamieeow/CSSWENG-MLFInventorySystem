const db = require('./models/database.js');
const mongoose = require('mongoose');
const Admins = require('./models/AdminModel.js');
const Artists = require('./models/ArtistModel.js');
const Bundles = require('./models/BundleModel.js');
const Cashiers = require('./models/CashierModel.js');
const Events = require('./models/EventModel.js');
const Items = require('./models/ItemModel.js');

db.connect();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

//TODO: populate the database using insertOne


var user = {
    userName: "admin",
    password: "pw123",
    _id: new mongoose.Types.ObjectId(),
};

bcryptjs.hash(user.password, saltRounds, function(err, hash) {
    user.password = hash
    db.insertOne(Admins, user, function(flag) {
        console.log(flag)
    })
})


artistName=['Summer-Rose Quintero', 'Amelia Lyon', 'Jared Kerr']

artistID=[1,2,3]

for (i=0;i<artistName.length;i++) {
    //Generate artists
    var generatedArtist = {
        _id: new mongoose.Types.ObjectId(),
        artistID: artistID[i],
        artistName: artistName[i],
    }
    //Create artists
    db.insertOne(Artists, generatedArtist, function(flag) {
        console.log(flag)
    })
}

//Generate cashiers
//Cashier 1
var generatedCashier1 = {
    _id: new mongoose.Types.ObjectId(),
    artistID: artistID[0],
    password: 'pw123',
}
//Cashier 2
var generatedCashier2 = {
    _id: new mongoose.Types.ObjectId(),
    artistID: artistID[1],
    password: 'pw123',
}
//Cashier 3
var generatedCashier3 = {
    _id: new mongoose.Types.ObjectId(),
    artistID: artistID[2],
    password: 'pw123',
}
//Create cashiers
//Cashier 1
bcryptjs.hash(generatedCashier1.password, saltRounds, function(err, hash) {
    generatedCashier1.password = hash;
    db.insertOne(Cashiers, generatedCashier1, function(flag) {
        console.log(flag)
    })
})
//Cashier 2
bcryptjs.hash(generatedCashier2.password, saltRounds, function(err, hash) {
    generatedCashier2.password = hash;
    db.insertOne(Cashiers, generatedCashier2, function(flag) {
        console.log(flag)
    })
})
//Cashier 3
bcryptjs.hash(generatedCashier3.password, saltRounds, function(err, hash) {
    generatedCashier3.password = hash;
    db.insertOne(Cashiers, generatedCashier3, function(flag) {
        console.log(flag)
    })
})

//Generate events
//Event 1
var generatedEvent1 = {
    _id: new mongoose.Types.ObjectId(),
    eventName: 'Malate Literary Folio Event 1',
    startDate: new Date('2020-09-26'),
    endDate: new Date('2020-10-05'),
    isCurrentEvent: true,
}
//Event 2
var generatedEvent2 = {
    _id: new mongoose.Types.ObjectId(),
    eventName: 'Malate Literary Folio Event 2',
    startDate: new Date('2020-09-26'),
    endDate: new Date('2020-10-20'),
    isCurrentEvent: false,
}

//Create events
//Event 1
db.insertOne(Events, generatedEvent1, function(flag) {
    console.log(flag)
})
//Event 2
db.insertOne(Events, generatedEvent2, function(flag) {
    console.log(flag)
})

//Generate items
itemNames = ['Cup cake sticker', 'Heart flowers sticker','Arrow hearts sticker',
            'Ice cream sticker','Key sticker','Kiss sticker',
            'Lips sticker','Lock sticker','Love birds sticker',
            'Lollipop sticker','Love letter sticker','Love sticker']

itemPictures = ['/photo/cupcakeSticker.png','/photo/heartFlowerSticker.png','/photo/heartSticker.png',
                '/photo/iceCreamSticker.png','/photo/keySticker.png','/photo/kissSticker.png',
                '/photo/lipsSticker.png','/photo/lockSticker.png','/photo/loveBirdsSticker.png',
                '/photo/lollipopSticker.png','/photo/loveLetterSticker.png','/photo/loveSticker.png']

k=0;
//Create items
for (i=0;i<artistName.length;i++) {
    //4 items per artist since there are 12 items total
    for (j=0;j<4;j++){
        //Event ID
        if (j%4 == 0 || j%4 == 1){
            eventID = generatedEvent1._id;
        }
        else {
            eventID = generatedEvent2._id;
        }
        var generatedItem = {
            _id: new mongoose.Types.ObjectId(),
            artistID: artistID[i],
            eventID: eventID,
            itemName: itemNames[k],
            itemPrice: (Math.floor(Math.random() * 100) + 30),
            stockQuantity: (Math.floor(Math.random() * 60) + 20),
            itemsSold: 0,
            itemPicture: itemPictures[k],
        }
        db.insertOne(Items, generatedItem, function(flag) {
            console.log(flag)
        })
        k++;
    }
}

//Generate bundles
bundleNames = ['Sticker bundle 1', 'Sticker bundle 2',
                'Sticker bundle 1', 'Sticker bundle 2',
                'Sticker bundle 1', 'Sticker bundle 2',]

k=0;
l=0;
//Create bundles
for (i=0;i<artistName.length;i++) { //3
    //2 bundles per artist since 4 items per artist
    for (j=0;j<2;j++) {
        itemArray = [];
        itemArray.push(itemNames[k]);
        k++;
        itemArray.push(itemNames[k]);
        k++;
        //Event ID
        if (j%2 == 0){
            eventID = generatedEvent1._id;
        }
        else {
            eventID = generatedEvent2._id;
        }
        var generatedBundles = {
            _id: new mongoose.Types.ObjectId(),
            artistID: artistID[i],
            eventID: eventID,
            includedItems: itemArray,
            bundleName: bundleNames[l],
            bundlePrice: (Math.floor(Math.random() * 100) + 30),
            bundleStock: (Math.floor(Math.random() * 60) + 20),
            bundleSold: 0,
            bundlePicture: '/photo/bundlePicture.jpg',
        }
        db.insertOne(Bundles,generatedBundles, function(flag){
            console.log(flag)
        })
        l++;
    }
}