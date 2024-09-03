
const request = require("supertest")
const mongoose = require("mongoose");
const app = require("../server");

require("dotenv").config();
let userId = 0
let eventId = 0

beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env["MONGOOSE_URL"],   { useNewUrlParser: true,useUnifiedTopology: true  });
  });
  
  



describe("Users tests", () => {

   
    it("should get all users", async () => {
        return request(app)
            .get("/api/users")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });


    it("should create a user", async () => {
        return request(app)
            .post("/api/users")
            .set('Content-Type', "application/json")
            .expect('Content-Type', /json/)
            .send({
                username: "tom",
                email: "tom@mail.com"
            })
            .expect(200)
            .then((res) => {
                userId = JSON.parse(res.text)._id
                expect(res.statusCode).toBe(200);
                expect(Object.keys(JSON.parse(res.text)).includes("_id")).toBe(true)
            })
    });


    it("should edit a user", async () => {

        return request(app)
            .patch("/api/users/"+userId)
            .set('Content-Type', "application/json")
            .expect('Content-Type', /json/)
            .send({
                email: "jacob@protonmail.com"
            })
            .expect(200)
            .then((res) => {
                let email = JSON.parse(res.text).email
                expect(res.statusCode).toBe(200);
                expect(Object.keys(JSON.parse(res.text)).includes("email")).toBe(true)
                expect(email === "jacob@protonmail.com").toBe(true)
            })
    });

    it("should get a user", async () => {
        return request(app)
            .get("/api/users/"+userId)
            .set('Content-Type', "application/json")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});


describe("Events tests", () => {

   
    it("should get all events", async () => {
        return request(app)
            .get("/api/events")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });


    it("should create an event", async () => {

   
        return request(app)
            .post("/api/events")
            .set('Content-Type', "application/json")
            .expect('Content-Type', /json/)
            .send({
                userId: userId,
                date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365))), // Random date within the last year
                event_type: "walking", // Random event type
                duration: Math.floor(Math.random() * 180), // Random duration between 0-180 minutes
                description: "Auto-generated event",
                data: {
                    info: `Random data walking`,
                    value: Math.floor(Math.random() * 100),
                },
            })
            .expect(200)
            .then((res) => {


                eventId = JSON.parse(res.text)._id
                expect(res.statusCode).toBe(200);
                expect(Object.keys(JSON.parse(res.text)).includes("_id")).toBe(true)
            })
    });


    it("should edit an event", async () => {

        return request(app)
            .patch("/api/events/"+eventId)
            .set('Content-Type', "application/json")
            .expect('Content-Type', /json/)
            .send({
                event_type: "sleeping"
            })
            .expect(200)
            .then((res) => {
                let eventType = JSON.parse(res.text).nModified
                expect(res.statusCode).toBe(200);
                expect(Object.keys(JSON.parse(res.text)).includes("nModified")).toBe(true)
                expect(eventType === 1).toBe(true)
            })
    });

    it("should get an event", async () => {
        return request(app)
            .get("/api/events/"+eventId)
            .set('Content-Type', "application/json")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});



// describe("POST /api/shorturl", () => {

//     let short_url = null
//     it("should shorten a URL", async () => {
//         return request(app)
//             .post("/api/shorturl")
//             .set('Content-Type', "application/json")
//             .expect('Content-Type', /json/)
//             .send({
//                 url: "https://www.facebook.com/groups/3164348350526480/?hoisted_section_header_type=recently_seen&multi_permalinks=3330217577272889"
//             })
//             .expect(200)
//             .then((res) => {
//                 short_url = JSON.parse(res.text).short_url
//                 expect(res.statusCode).toBe(200);
//                 expect(Object.keys(JSON.parse(res.text)).includes("short_url")).toBe(true)
//             })
//     });
// });


// describe("POST /api/shorturl/:id", () => {

    
//     it("id does not exist", async () => {
//         return request(app)
//             .get("/api/shorturl/999")
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.text.includes("not refering to a URL in db")).toBe(true)
             
//             })
//     });

//     it("ID not a number", async () => {
//         return request(app)
//             .get("/api/shorturl/catsanddos")
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.text.includes("Please enter a valid ID")).toBe(true)
             
//             })
//     });
// });



afterAll(async () => {
    await mongoose.disconnect();
  });


