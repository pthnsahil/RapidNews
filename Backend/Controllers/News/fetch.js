const NewsModel=require('../../models/news');

const Fetch=async(req,res)=>{
    try{
          const {email}=req.body;
          const check= await NewsModel.findOne({email:email})
          if(check)
           {
             return res.json(check);
           }
           res.json({})

    }
    catch(err)
    {
         res.json("error")
    }

}

module.exports=Fetch