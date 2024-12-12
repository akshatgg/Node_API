import { deleteImageByUrl, uploadToCloudinary } from "../config/cloudinaryUploader";
import { prisma } from "../index";
import { Request, Response } from "express";

export default class BlogController {
  static async createPost(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body)
      const { title, category, contentHeading, contentDescription } = req.body;
      const localFilePath = req.file?.path;
      const cloudinaryResult = await uploadToCloudinary(localFilePath, "image", req, req.file);
      const imageUrl = cloudinaryResult.secure_url
      if (!title || !contentHeading || !imageUrl) {
        return res
          .status(400)
          .json({ success: true, message: "Required body params are missing" });
      }

      const user = req.user!;

      const post = await prisma.post.create({
        data: {
          userId: user.id,
          title,
          category,
          contentHeading,
          contentDescription,
          imageUrl: imageUrl,
        },
      });

      return res.status(201).json({ success: true, data: post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }

  static async getAllPosts(req: Request, res: Response): Promise<Response> {
    try {
      // Pagination parameters
      const { page = 1, limit = 10 } = req.query;
      const parsedPage = parseInt(page.toString(), 10);
      const parsedLimit = parseInt(limit.toString(), 10);

      // Calculate the offset based on the page and limit
      const offset = (parsedPage - 1) * parsedLimit;

      // Calculate the pages by limit
      const pages = Math.ceil((await prisma.post.count()) / parsedLimit);

      const posts = await prisma.post.findMany({
        skip: offset,
        take: parsedLimit,
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).send({ success: true, data: { posts, pages } });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async getPostById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) {
        return res
          .status(404)
          .send({ success: false, message: "Blog Post Not Found" });
      }

      return res.status(200).send({ success: true, data: post });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

static async updatePost(req: Request, res: Response): Promise<Response> {
  try {
    const { title, contentHeading, category, contentDescription } = req.body;
    const imageUrl: string = req.file?.path as string;
    console.log("🚀 ~ BlogController ~ updatePost ~ imageUrl:", imageUrl);

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required for this operation",
      });
    }

    const user = req.user!;

    // Find the post belonging to the user
    const post = await prisma.post.findFirst({
      where: { id, userId: user.id },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const oldImage = post.imageUrl;

    // Delete old image if a new image is uploaded
    if (imageUrl && oldImage) {
      await deleteImageByUrl([oldImage]);
    }

    // Build the update data object dynamically
    const updateData: any = {};
    if (title) updateData.title = title;
    if (contentHeading) updateData.contentHeading = contentHeading;
    if (category) updateData.category = category;
    if (contentDescription) updateData.contentDescription = contentDescription;
    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    } else if (oldImage) {
      updateData.imageUrl = oldImage;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.error("🚀 ~ BlogController ~ updatePost ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
    }
  }

  static async deletePost(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: true,
          message: "Post ID is required for this operation",
        });
      }

      const user = req.user!;

      const post = await prisma.post.findFirst({
        where: { id, userId: user.id },
      });

      if (!post) {
        return res
          .status(404)
          .json({ success: true, message: "Post not found" });
      }

      if (post.userId !== user.id) {
        return res
          .status(403)
          .json({ success: true, message: "Unauthorized Access" });
      }

      await prisma.post.delete({
        where: { id },
      });

      return res.status(200).json({ success: true, message: "Post deleted" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
}
