const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const { MONGO_URL } = process.env;

const app = require("../app");

describe("test login routes", () => {
	beforeAll(() => {
		mongoose.connect(MONGO_URL).then(() => (app.listen(5000)));
	});
	afterAll(async() => await mongoose.disconnect());

	test("test send login ", async () => {
		const loginUser = {
			password: "123456",
			email: "victor10@mail.com"
		};

		const response = await request(app)
			.post("/api/users/login")
			.send(loginUser);
        
		const { token, user } = response.body;
        console.log("token", token)
        console.log("user", user)
		expect(response.statusCode).toBe(200);
		expect(token).not.toBe(null);
		expect(user).toBeDefined();
		expect(typeof user.email).toBe("string");		
	});

   


});
