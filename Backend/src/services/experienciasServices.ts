import { experienciasofDB } from "../modelos/types_d_experiencias";
import { usersofDB } from "../modelos/types_d_users";


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
        return await experienciasofDB.findByIdAndUpdate(id, body, { new: true });
    },
    delete: async(id:string)=>{
        return await experienciasofDB.findByIdAndDelete(id);
    },
    getExperiencesByUsername: async (name: string) => {
        console.log(`Searching experiences for user name: ${name}`);
        const user = await usersofDB.findOne({ name });
        if (!user) {
            console.log('No user found with this name');
            return [];
        }
        console.log(`User ID for name "${name}":`, user._id);
        const experiences = await experienciasofDB.find({
            $or: [
                { owner: user._id },
                { participants: user._id },
            ],
        })
            .populate('owner', 'name')
            .populate('participants', 'name');
        console.log('Populated and filtered experiences:', experiences);
        return experiences;
    }
}