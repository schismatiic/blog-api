import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import { getPosts } from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const loadPosts = async () => {
      setLoadingPage(true);
      try {
        const data = await getPosts(page);
        setPosts(data.posts);
        setHasNextPage(data.hasNextPage);
        setHasPreviousPage(data.hasPreviousPage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setLoadingPage(false);
      }
    };
    loadPosts();
  }, [page]);
  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };
  const goToNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };
  if (loading)
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center min-h-screen">
        <p className="text-teal-400 text-sm tracking-wide">Loading posts...</p>
        <FaPaw className="text-teal-400 text-5xl animate-paw-spin" />
      </div>
    );
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            {hasPreviousPage && (
              <button
                className="cursor-pointer hover:text-taupe-500"
                onClick={goToPreviousPage}
                disabled={page === 1 || loadingPage}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </button>
            )}
            <span>Page {page}</span>
            {hasNextPage && (
              <button
                className="cursor-pointer hover:text-taupe-500"
                onClick={goToNextPage}
                disabled={loadingPage}
                aria-label="Next page"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </>
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
