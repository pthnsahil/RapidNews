const UserModel=require('../../models/user');

const Login=async (req, res) => {

    const { email, password} = req.body;
    console.log(req.body);
    try {
        const user = await UserModel.findOne({ email, password });
  
        if (!user) {
            return res.status(500).json({ check: false, error: "Incorrect email or password" });
        }
        res.status(201).json({ check: true, message: "Login successful" });
    } catch (error) {
  
        res.status(500).json({ check: false, error: "Internal server error" });
    }
  }

module.exports=Login;