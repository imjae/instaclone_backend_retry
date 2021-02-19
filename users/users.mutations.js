import client from '../client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, userName, email, password }) => {
      // DB에 username과 email이 존재하는지 확인
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ userName }, { email }],
        },
      });
      // console.log(existingUser);

      try {
        if (existingUser) {
          throw new Error('userName, email이 이미 존재합니다.');
        }
        // password hash
        const uglyPassword = await bcrypt.hash(password, 10);

        return await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
