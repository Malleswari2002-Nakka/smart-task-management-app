import {userService} from "../services/user.js";


export async function getUsers(req,res) {
    try{
      const users=await userService();
      res.json(users);
    }catch(error){
        res.status(500).json({message:error});
    }
    
}