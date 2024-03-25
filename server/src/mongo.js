const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://VG123:Abcd123$@customers.c411cqs.mongodb.net/myMovieList?retryWrites=true&w=majority&appName=Customers');


// Check if database connected
connect.then(() => {
    console.log("Database connected successfully!");
})
.catch((error) => {
    console.log("Database cannot be connected.", error)
})

// Create a Schema
const LoginSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
        
    }
});

const SignupSchema = new mongoose.Schema({
    email: {
        type: String
        
    },
    username: {
        type: String
        
    },
    password: {
        type: String
        
    },
    confirmPassword: {
        type: String
    }
});

// Collection part
//const LoginModel = new mongoose.model("Users", LoginSchema);


const SignupModel = mongoose.model("User", SignupSchema)
module.exports = SignupModel;

// const LoginModel = mongoose.model("Logins", LoginSchema)
// module.exports = LoginModel;

//module.exports = { LoginModel, SignupModel};