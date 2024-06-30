const UserModel=require('../../models/user');

const Register=async (req, res) => {
    try {
        const { email,password } = req.body;
  
         console.log(req.body);
        const check = await UserModel.findOne({ email });
  
        if (check) {
            return res.json({ check: false, message: "User already exists" });
        }
  
        const newUser = new UserModel({ email, password});
        await newUser.save();
  
        res.json({ check: true, message: "User registered successfully" });
    } catch (error) {
  
        console.error("Error registering user:", error);
        res.json({ check: false, error: "Internal server error" });
    }
  }

module.exports=Register;
