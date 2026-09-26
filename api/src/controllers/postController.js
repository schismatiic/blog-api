import db from "../../db/queries.js";

// Read
const getPosts = async (req, res) => {
  const posts = await db.getPosts();
  return res.json(posts);
};
const getPost = async (req, res) => {
  const { postId } = req.params;
  const post = await db.getPostById(Number(postId));
  if (!post) {
    return res.sendStatus(404);
  }
  return res.json(post);
};

export { getPosts, getPost };
