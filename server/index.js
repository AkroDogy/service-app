const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const connection = require("./db/connection");
const passport = require("passport");
const authRoute = require("./routes/authRoutes");
const app = express();
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
require('./auth/passport')

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
connection();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use(carRoutes);
app.use(userRoutes);
app.use(mechanicRoutes);


app.listen("5000", () => {
  console.log(">> Server is running!");
});

