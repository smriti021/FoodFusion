const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://FoodFusion:Food123@cluster0.3rijtxw.mongodb.net/FoodFusionMern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("menu").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.menu = fetched_data;
        global.foodCategory = foodCategory;

        console.log("Menu:", global.menu);
        console.log("Food Category:", global.foodCategory);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
