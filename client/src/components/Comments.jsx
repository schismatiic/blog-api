import { useEffect, useState } from "react";
import { getComments } from "../services/api";
import CommentCard from "./CommentCard";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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
  if (loading) {
    return <p>Loading comments...</p>;
  }
  return (
    <section>
      <h2 className="text-2xl mb-2">Comments</h2>
      <ul className="flex flex-col gap-1">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-taupe-500">No comments yet.</p>
        )}
      </ul>
    </section>
  );
};
export default Comments;
