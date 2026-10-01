const CommentCard = ({ comment }) => {
  const formattedDate = new Date(comment.added).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <article className="flex items-center gap-2">
      <div className="w-12 h-12 shrink-0 rounded-full bg-teal-400">
        <img
          src={comment.users.avatarUrl}
          alt={comment.users.username}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div>
        <p className="text-teal-400">{comment.users.username}</p>
        <p>{comment.content}</p>
        <p className="text-sm text-taupe-500">{formattedDate}</p>
      </div>
    </article>
  );
};

export default CommentCard;
