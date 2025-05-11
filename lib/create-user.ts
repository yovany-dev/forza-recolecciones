// import { prisma } from '@/lib/prisma';

// interface User {
//   name: string;
//   email: string;
//   avatar: string;
//   password: string;
//   role: string;
// }

// const bcrypt = require('bcrypt');
// const encryptPassword = async (password: string) => {
//   const hashedPassword = await bcrypt.hash(password, 10);

//   return hashedPassword;
// };

// const createUser = async (user: User) => {
//   const hashedPassword = await encryptPassword(user.password);
//   const newUser = await prisma.users.create({
//     data: {
//       name: user.name,
//       email: user.email,
//       avatar: user.avatar,
//       password: hashedPassword,
//       role: user.role,
//     },
//   });
//   return newUser;
// };

// export { createUser };
