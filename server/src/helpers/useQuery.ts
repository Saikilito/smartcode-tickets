import { getRepository } from "typeorm";
import { Users as UserEntity, UserTypes as UserTypeEntity } from "../entity";

const useQuery = {
  initDefaultData: async () => {
    try {
      //Define initTypes
      const userTypes = [
        {
          nombre: "admin",
        },
        {
          nombre: "user",
        },
      ];

      //Search UserTypes
      const adminRolType = await getRepository(UserTypeEntity).findOne({ nombre: userTypes[0].nombre });
      if (!adminRolType) {
        //Create admin
        const createAdminType = getRepository(UserTypeEntity).create(userTypes[0]);
        const response = await getRepository(UserTypeEntity).save(createAdminType);
        console.info(response);
      }

      const userRolType = await getRepository(UserTypeEntity).findOne({ nombre: userTypes[1].nombre });
      if (!userRolType) {
        //Create user
        const createUserType = getRepository(UserTypeEntity).create(userTypes[1]);
        const response = await getRepository(UserTypeEntity).save(createUserType);
        console.info(response);
      }

      //Define Admin User
      const adminUser = {
        nombre: "admin",
        mail: "admin@smartcode.com",
        pass: "123456",
        id_tipouser: {
          id: 1,
          nombre: "admin",
        },
      };

      //Search user
      const userFound = await getRepository(UserEntity).findOne({ nombre: adminUser.nombre });
      if (!userFound) {
        //Create admin
        const createAdmin = getRepository(UserEntity).create(adminUser);
        const response = await getRepository(UserEntity).save(createAdmin);
        console.info(response);
      }
    } catch (error) {
      console.error(error);
      console.error("Insert Init database failed");
    }
  },
};

export default useQuery;
