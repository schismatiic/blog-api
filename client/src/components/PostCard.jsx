import { Heart } from "lucide-react";
import { Link } from "react-router";

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.added).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="h-full">
      <Link
        to={`/posts/${post.id}`}
        className="flex h-full flex-col overflow-hidden rounded-3xl bg-olive-100 border border-taupe-600/30 shadow-sm transition-transform hover:-translate-y-1"
      >
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          className="w-full aspect-4/3 object-cover"
        />
        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm text-taupe-600 mb-2">{formattedDate}</p>
          <h2 className="text-2xl font-black text-teal-400">{post.title}</h2>
          <p className="mt-3 line-clamp-4 text-base leading-relaxed">
            {post.content}
          </p>
          <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-xl bg-teal-400 px-4 py-2 font-bold text-olive-100 transition-colors hover:bg-teal-500">
            Read more
            <Heart className="w-5 h-5" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
