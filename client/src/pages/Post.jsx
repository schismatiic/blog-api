import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPostById } from "../services/api";
import { ChevronLeft } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router";
import Comments from "../components/Comments";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPostById(postId);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [postId]);
  if (loading)
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center min-h-screen">
        <p className="text-teal-400 text-sm tracking-wide">Loading post...</p>
        <FaPaw className="text-teal-400 text-5xl animate-paw-spin" />
      </div>
    );
  if (!post) {
    return <p>Post not found.</p>;
  }
  const formattedDate = new Date(post.added).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <Link
        to="/"
        className="flex items-center gap-2 m-4 cursor-pointer text-taupe-600 hover:text-taupe-500"
      >
        <ChevronLeft />
        <p>Back</p>
      </Link>
      <div className="flex justify-center">
        <article className="mx-4 my-8 mt-0 w-full max-w-4xl p-6 md:p-8 rounded-3xl bg-olive-100 border border-taupe-600/30 shadow-sm">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl border border-taupe-600/30"
          />
          <div className="mt-6">
            <p className="text-sm text-taupe-600">{formattedDate}</p>
            <h1 className="mt-2 text-3xl font-black text-teal-400 md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 text-md md:text-lg leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
          <div className="mt-8">
            <Comments postId={postId} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Post;
