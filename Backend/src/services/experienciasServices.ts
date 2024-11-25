import { experienciasofDB } from "../modelos/types_d_experiencias";

export const getEntries = {
    getAll: async()=>{
    return await experienciasofDB.find();
    },
    findById: async(id:string)=>{
        return await experienciasofDB.findById(id);
    },
    findUserById: async(id:string)=>{
        return await experienciasofDB.findById(id).populate('owner').populate('participants');
    },
    addParticipant: async(idExp:string,idPart:string)=>{
        return await experienciasofDB.findByIdAndUpdate(idExp,{$addToSet:{participants:idPart}});
    },
    delParticipant: async (idExp: string, idPart: string) => {
        return await experienciasofDB.findByIdAndUpdate(
          idExp,
          { $pull: { participants: idPart } }, // Usamos $pull para eliminar solo el participante
          { new: true } // Opción para devolver el documento actualizado
        );
      }
    ,
    create: async(entry:object)=>{
        return await experienciasofDB.create(entry);
    },
    update: async(id:string,body:object)=>{
        console.log(body);
        return await experienciasofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    delete: async(id:string)=>{
        return await experienciasofDB.findByIdAndDelete(id);
    }
}