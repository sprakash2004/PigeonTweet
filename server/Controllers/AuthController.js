import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Check if user exists
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPass
        });

        // Save user and return response
        const user = await newUser.save();
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET || "MERN",
            { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        const validity = await bcrypt.compare(password, user.password);
        if (!validity) {
            return res.status(400).json("Wrong password");
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET || "MERN",
            { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*
import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// register new users
export const registerUser = async (req, res) => {
    console.log("Received registration request:", req.body);
/*
//         const { firstname, lastname, email, password } = req.body;

//         // Validate input
//         if (!firstname || !lastname || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }
//         if (password.length < 6) {
//             return res.status(400).json({ message: "Password must be at least 6 characters long" });
//         }
//         // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         //     return res.status(400).json({ message: "Invalid email format" });
//         // }
//     const salt = await bcrypt.genSalt(10);
//     let pass = password.toString();
//     const hashedPass = await bcrypt.hash(pass, parseInt(salt));
//     req.body.password = hashedPass;


//     const newUser = new UserModel(req.body);


//     try {

//         const oldUser = await UserModel.findOne({ email });

//         if (oldUser) {
//             return res.status(400).json({ message: "This User already exists!" })
//         }

//         const user = await newUser.save();

//         const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);

//         res.status(200).json({ user, token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// //}

    try {
        const { firstname, lastname, email, password } = req.body;

        // Check if user exists
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPass
        });

        // Save user and return response
        const user = await newUser.save();
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY || "MERN",
            { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Login users

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            if (!validity) {
                res.status(400).json("Soory, Please enter the correct email or password!");
            } else {
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("Soory, Please enter the correct email or password!")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
*/