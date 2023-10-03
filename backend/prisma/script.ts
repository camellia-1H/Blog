import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: "manh123",
  //     email: "alice@prisma.io",
  //     password : "manh",
  //   },
  // });
  // console.log(user)

  // const newpost = await prisma.post.create({
  //   data : {
  //     title : 'manh',
  //     content: 'manh123',
  //     published : true,
  //     author : {
  //       connect : {email : 'alice@prisma3.io'}
  //     },
  //   },
  // })

  // console.log(newpost);

  // const user = await prisma.user.findUnique({
  //   where : {
  //     email : 'alice@prisma.io'
  //   }
  // })


  // const usersWithPosts = await prisma.post.findMany({
  //   where : {
  //     authorId : user?.id
  //   }
  // })
  // console.log(usersWithPosts);

  const result = await prisma.post.findMany({
    where: {
      AND: [{ id: '6513f04efccce24f371903db'  }, { authorId: '6513eb8ba64cabe396d7f0d4' }],
    },
  });
  console.log(result);
  
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
