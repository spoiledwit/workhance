import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import { imageUploader } from "../utils/Uploader.js";

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.files?.image;
    const video = req.files?.video;

    if (!caption && !image && !video) {
      return res.status(400).json({ message: "Content is missing" });
    }

    const promises = [];
    if (image) {
      promises.push(imageUploader(image));
    }
    const results = await Promise.all(promises);

    const newPost = new PostModel({
      caption,
      images: results,
      video,
      authorId: req.userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    // getting all the posts and populating the authorId field with Auth model name, email, bio, profilePicture, followers and attaching it as author field
    const posts = await PostModel.find().populate(
      "authorId",
      "name email bio profilePicture followers"
    ).sort({createdAt: -1});
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByUserId = async (req, res) => {
  try {
    const posts = await PostModel.find({
      authorId: req.params.id,
    }).populate(
      "authorId",
      "name email bio profilePicture followers"
    ).sort({createdAt: -1});
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    const isLiked = post.likes.includes(req.userId);

    if (isLiked) {
      res.status(400).json({ message: "Post is already liked" });
      return;
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        likes: [...post.likes, req.userId],
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const disLikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    const isLiked = post.likes.includes(req.userId);

    if (!isLiked) {
      res.status(400).json({ message: "Post is not liked" });
      return;
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        likes: post.likes.filter((id) => id.toString() !== req.userId),
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: "Content is missing" });
      return;
    }

    const newComment = new CommentModel({
      content,
      userId: req.userId,
      postId: id,
    });

    await newComment.save();
    const post = await PostModel.findById(id);
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await CommentModel.find({ postId: id }).populate(
      "userId",
      "name email bio profilePicture followers"
    ).sort({createdAt: -1});
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
