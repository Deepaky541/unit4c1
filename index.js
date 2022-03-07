const express=require("express");
const app=express();

app.use(logger);
app.use(checkPermission);

app.get("/books",(req,res)=> {
    return res.send({route:"/books",role: req.role})
});

app.get("/libraries",(req,res)=>{
    return res.send({route:"/libraries",role: req.role,permission:req.permission})
});

app.get("/authors",(req,res)=>{
   return res.send({route:"/authors",role: req.role,permission:req.permission})
});
function logger(req,res,next)
{
    if(req.path==="/books")
    {
        req.role="books"
    }
    else if(req.path==="/libraries")
    {
        req.role="libraries"
    }
    else  if(req.path==="/authors")
    {
        req.role="authors"
    }
    next();
}
function checkPermission(req,res,next)
{
    if(req.path==="/libraries")
    {
        req.role="librarians";
        req.permission=true;
        
    }
    else if(req.path==="/authors")
    {
        req.role="author";
        req.permission=true;
    }
    next();
}