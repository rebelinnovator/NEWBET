const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOURL, {
    useMongoClient: true,
    autoIndex: false
    // other options 
});

const db_collections = [
    "data_accounts",
    "data_bet_results",
    "data_one_bets",
    "data_task_types",
    "data_tasks",
    'data_promotionbonus',
    'data_financials',
    'data_applybonus',
    'data_complaints'
];

mongoose.connection.once('open', function(){
    mongoose.connection.db.listCollections().toArray(function (err, collectionNames) {
        if (err) {
          console.log(err);
          return;
        }
        var nameArray = [];
        collectionNames.forEach((collection) => {
            nameArray.push(collection.name);
        })

        db_collections.forEach((name) => {
            if (nameArray.indexOf(name) == -1) {
                mongoose.connection.db.createCollection(name);
                
                console.log("Create '" + name + "' collection.");
            }
        })
    });
    console.log('-- [ MongoDB ] CONNECTION SUCCESSFUL --');
}).on('error', function(error){
    console.log('-- [ MongoDB ] CONNECTION ERROR :', error);
});