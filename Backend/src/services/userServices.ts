import { usersofDB } from '../modelos/types_d_users'
//import userData from './users.json'

export const getEntries = {
    getAll: async()=>{
    return await usersofDB.find();
    },
    findById: async(id:string)=>{
        return await usersofDB.findById(id);
    },
    addExperiencies: async(idUser:string,idExp:string)=>{
        return await usersofDB.findByIdAndUpdate(idUser,{$addToSet:{experiencies:idExp}});
    },
    delExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(
          idUser,
          { $pull: { experiencies: idExp } }, // Usamos $pull para eliminar solo la experiencia
          { new: true } // Opción para devolver el documento actualizado
        );
      },
    create: async(entry:object)=>{
        return await usersofDB.create(entry);
    },
    update: async(id:string,body:object)=>{
        console.log(body);
        return await usersofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    delete: async(id:string)=>{
        return await usersofDB.findByIdAndDelete(id);
    }
}