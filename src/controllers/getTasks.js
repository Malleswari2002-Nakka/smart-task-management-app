import { taskService } from "../services/getTasks.js";


export async function getTasks(req,res) {
    try{
      const tasks=await taskService();
      res.json(tasks);
    }catch(error){
        res.status(500).json({message:error});
    }
    
}