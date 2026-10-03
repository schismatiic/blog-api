import { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { Send } from "lucide-react";
import { Link } from "react-router";
import { createComment, getComments } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CommentCard from "./CommentCard";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPosting(true);
    try {
      const comment = await createComment(content, postId, token);
      console.log(comment);
      setComments((currentComments) => [comment, ...currentComments]);
      setContent("");
    } catch (error) {
      setError(error.message);
    } finally {
      setPosting(false);
    }
  };
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [postId]);
  if (loading)
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center min-h-screen">
        <p className="text-teal-400 text-sm tracking-wide">
          Loading comments...
        </p>
        <FaPaw className="text-teal-400 text-5xl animate-paw-spin" />
      </div>
    );
  return (
    <section>
      <h2 className="text-2xl mb-2">Comments</h2>
      {token ? (
        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div>
            <textarea
              id="content"
              name="content"
              placeholder="Write a comment..."
              rows={4}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full resize-none rounded-2xl border border-taupe-600/30 bg-olive-100 p-4 text-sm outline-none transition focus:border-teal-400"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={posting}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-teal-400 px-5 py-2.5 font-bold text-olive-100 transition-colors hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {posting ? "Posting..." : "Post comment"}
            {!posting && <Send className="h-4 w-4" />}
          </button>
        </form>
      ) : (
        <p className="text-sm text-taupe-600">
          You need to{" "}
          <Link
            to="/auth/login"
            className="font-bold text-teal-400 hover:text-teal-500"
          >
            log in
          </Link>{" "}
          to leave a comment.
        </p>
      )}
      <ul className="flex flex-col gap-1 mt-10">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id}>
              <CommentCard comment={comment} />
            </li>
          ))
        ) : (
          <li className="text-taupe-500">No comments yet.</li>
        )}
      </ul>
    </section>
  );
};
export default Comments;
