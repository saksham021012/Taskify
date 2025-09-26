require('dotenv').config();
const express = require("express");
const database = require('./config/database')
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const { clerkMiddleware, requireAuth } = require('@clerk/express');




const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://taskify-flame-chi.vercel.app"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

database.connect();

app.use(express.json());
app.use(clerkMiddleware());

const checkAuth = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
};
//import routes

const task = require("./routes/Task");


//use routes
app.use('/api/tasks',checkAuth, task);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: `Your server is up and running`
    })
})

// // Protected route
// app.get("/api/protected", ClerkExpressRequireAuth(), (req, res) => {
//   res.send("You are authenticated with Clerk!");
// });

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})