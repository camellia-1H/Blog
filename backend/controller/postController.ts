import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const postController = {
  getAllPost: async (req: Request, res: Response) => {  
    try {
      const allPost = await prisma.post.findMany({
        where: {
          published: true,
        },
        orderBy: {
          updateAt: "desc",
        },
      });
      return res.status(200).json(allPost);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  uploadPost: async (req: Request, res: Response) => {
    try {
      const { title, content, authEmail, published, image } = req.body;
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          published,
          thumbnail : image,
          author: {
            connect: {
              email: authEmail,
            },
          },
        },
      });
      return res.status(200).json(newPost);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  deletePost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.delete({
        where: {
          id,
        },
      });
      return res.status(200).json('Delete post successfully');
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  updatePost: async (req: Request, res: Response) => {
    try {
      const { id, userid } = req.params;
      console.log(userid);

      const { title, content, published, previewImage } = req.body;
      const post = await prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          published: Boolean(published),
          thumbnail : previewImage
        },
      });
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
  getPostById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getPostsByUserId: async (req: Request, res: Response) => {
    try {
      const { userid } = req.params;
      const post = await prisma.post.findMany({
        where: {
          authorId: userid,
        },orderBy: {
          updateAt: "desc",
        },
      });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  filterPostBySearchString: async (req: Request, res: Response) => {},
  filterPostByCategory: async (req: Request, res: Response) => {},
};

export default postController;
