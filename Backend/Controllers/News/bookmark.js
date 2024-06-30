const NewsModel=require('../../models/news');

const Bookmarks=async(req,res)=>{
    try{
    
     const {email,bookmarked}=req.body
   
     let data=await NewsModel.findOne({email:email})
     if(data && Object.keys(bookmarked).length !=0)
      {
        console.log(bookmarked)
         const temp=await NewsModel.updateOne({email:email},{bookmarked:bookmarked})  
      }
      else if(Object.keys(bookmarked).length !=0)
      {
     
        const info=new NewsModel({email,bookmarked})
        await info.save();
      }
      data=await NewsModel.findOne({email})
      if(data)
        {
       
           res.json(data.bookmarked)
        }
        else{
          const bookmarked={"ABP ASMITA":[],"TV9 GUJARATI":[],"BBC GUJARATI":[],"INDIAN EXPRESS GUJARATI":[]}
           res.json(bookmarked)
        }
    
    }catch(err)
    {
      res.json("error")
    }
  
  }

module.exports=Bookmarks;