import {Request, Response} from 'express';
import {Training} from "src/models";
import {TrainingStatusEnum} from "src/enums"
import { Op } from 'sequelize';

class submitController {
    submitRequest = async (req: Request, res: Response) => {
        const studentId=req.body.studentId;
        const type=req.body.type;
        // //if student has pending request
        // var record = await Training.findOne({
        //   where: {
        //     studentId: studentId,
        //     status:TrainingStatusEnum.pending 
        //   }
        // });
        // if (record){
        //     return res.status(401).json({error: `student ${studentId} has pending request`});
        // }
        // //if student has running request
        // record = await Training.findOne({
        //     where: {
        //       studentId: studentId,
        //       status:TrainingStatusEnum.running 
        //     }
        //   });
        //   if (record){
        //       return res.status(401).json({error: `student ${studentId} has running request`});
        //   }

        //to check that student has only one training for a type
        var record = await Training.findOne({
            where: {
              studentId: studentId,
              type: type,
              status: {
                [Op.notIn]: [TrainingStatusEnum.rejected, TrainingStatusEnum.canceled]
              }
            }
          });
        if (record){
               return res.status(401).json({error: `student ${studentId} has ${record.status} traing `});
            }
        
        //to check that student finished first Training
        if(type=='second'){
         record = await Training.findOne({
             where: {
               studentId: studentId,
              status:TrainingStatusEnum.submitted,
              type: 'first'
             }
           });
        if(!record){
            return res.status(401).json({error: `student ${studentId}  sholud finished first Training  `});  
        }       
        }
        if(type=='combined'){
            record = await Training.findOne({
                where: {
                  studentId: studentId,
                 status:TrainingStatusEnum.submitted,
                 type: 'first'
                }
              });
           if(!record){
               return res.status(401).json({error: `student ${studentId}  sholud finished first Training  `});  
           }       
           }





    }
}