const mongoose = require("mongoose");
const User = require("./path-to-your-models/User"); // Update the path to your User model
const UserEvent = require("./path-to-your-models/UserEvent"); // Update the path to your UserEvent model

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/your-database-name", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedDB = async () => {
    await connectDB();

    try {
        // Clear existing data
        await User.deleteMany({});
        await UserEvent.deleteMany({});

        // Seed users
        const users = await User.insertMany([
            { username: "john_doe", email: "john@example.com" },
            { username: "jane_doe", email: "jane@example.com" },
        ]);

        // Define the number of events to generate per user
        const eventsPerUser = 1000; // Adjust this number as needed

        // Expanded list of event types
        const eventTypes = [
            "exercise", 
            "study", 
            "work", 
            "leisure", 
            "social", 
            "travel", 
            "shopping", 
            "health", 
            "entertainment", 
            "meal"
        ];

        // Generate events for each user
        const userEvents = [];
        for (const user of users) {
            for (let i = 0; i < eventsPerUser; i++) {
                const event = {
                    userId: user._id,
                    date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365))), // Random date within the last year
                    event_type: eventTypes[Math.floor(Math.random() * eventTypes.length)], // Random event type
                    duration: Math.floor(Math.random() * 180), // Random duration between 0-180 minutes
                    description: "Auto-generated event",
                    data: {
                        info: `Random data ${i}`,
                        value: Math.floor(Math.random() * 100),
                    },
                };
                userEvents.push(event);
            }
        }

        await UserEvent.insertMany(userEvents);

        console.log(`${userEvents.length} events have been generated and inserted into the database.`);
    } catch (err) {
        console.error("Error seeding database:", err.message);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
