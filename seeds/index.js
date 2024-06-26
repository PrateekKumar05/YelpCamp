const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66240929b21130f15bed77c5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugiat expedita ipsam, ducimus autem molestias, voluptas vero nihil consequatur unde tempora! Quod, unde, nihil iusto cupiditate veniam rem, quo vitae quibusdam ad deleniti consequatur iste voluptas hic reiciendis sed nemo labore ab quis laudantium. Vel voluptatum non veniam. Reiciendis, deserunt?',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dtxd8wg3j/image/upload/v1714204213/YelpCamp/bsdnwiaxayjnrzqr3ana.jpg',
                  filename: 'YelpCamp/bsdnwiaxayjnrzqr3ana',
                },
                {
                  url: 'https://res.cloudinary.com/dtxd8wg3j/image/upload/v1714204217/YelpCamp/je0o9xfiishquhne6h3j.jpg',
                  filename: 'YelpCamp/je0o9xfiishquhne6h3j',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})