const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download",(req,res)=>{
 const {url,type}=req.body;
 if(!url) return res.json({success:false});
 const cmd = type==="mp3"
 ? `yt-dlp -x --audio-format mp3 "${url}"`
 : `yt-dlp "${url}"`;
 exec(cmd,(err)=>{
  if(err) return res.json({success:false});
  res.json({success:true});
 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Server running on "+PORT));