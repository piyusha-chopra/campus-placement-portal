const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{

    //first check request headers has authorization or not
    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({err:'Token not found'});

    //Split and validate the header
    const parts=authorization.split(' ');
    if(parts.length!==2 || parts[0]!=='Bearer') return res.status(401).json({err:'Invalid token format'});

    //extract the token from parts
    const token= parts[1];
    if(!token) return res.status(401).json({err:'Unauthorized'});

    try{
        
        //verify the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET,{expiresIn:30000});

        //attach the information to request object
        req.user=decoded;

        console.log('JWT verified sucessfully');
        next();

    }catch(err){

        console.log(err);
        res.status(401).json({ error: 'Invalid token' });

    }

}

module.exports=jwtAuthMiddleware;