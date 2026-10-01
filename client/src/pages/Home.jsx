import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="mx-4 md:mx-16 my-4 ">
      <header className="mb-6 ">
        <h1 className="text-xl font-black text-teal-400 md:text-4xl">
          Latest Posts
        </h1>
        <p className="mt-1 text-taupe-600 text-sm md:text-lg">
          Thoughts, stories, and little things from Fufú's world.
        </p>
      </header>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-center text-lg text-taupe-600 flex h-full flex-col overflow-hidden rounded-2xl p-4 w-fit bg-olive-100 border border-taupe-600/20 shadow-sm">
            There are no posts yet. Check back soon, meow! ♡
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
