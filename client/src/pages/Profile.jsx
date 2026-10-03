import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUserAvatar } from "../services/api";

const Profile = () => {
  const { profile, setProfile, token } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const updatedProfile = await updateUserAvatar(avatarUrl, token);
      navigate("/");
      setProfile(updatedProfile);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (!profile)
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center min-h-screen">
        <p className="text-teal-400 text-sm tracking-wide">
          Loading profile...
        </p>
        <FaPaw className="text-teal-400 text-5xl animate-paw-spin" />
      </div>
    );

  return (
    <div>
      <Link
        to="/"
        className="flex items-center gap-2 m-4 text-taupe-600 hover:text-taupe-500"
      >
        <ChevronLeft />
        <p>Back</p>
      </Link>
      <section className="flex justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-olive-100 p-6 shadow-sm border border-taupe-600/30">
          <h1 className="text-3xl font-black text-teal-400 text-center">
            Your Profile
          </h1>
          <div className="mt-8 flex flex-col items-center">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.username}
                className="h-32 w-32 rounded-full object-cover border-2 border-teal-400"
              />
            ) : (
              <div className="h-32 w-32 border border-taupe-600/40 rounded-full flex items-center justify-center">
                <User
                  strokeWidth={1.5}
                  className="h-20 w-20 p-1 cursor-pointer"
                />
              </div>
            )}
            <p className="mt-4 text-xl font-bold text-teal-400">
              @{profile.username}
            </p>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="avatarUrl">Avatar URL</label>
              <input
                id="avatarUrl"
                name="avatarUrl"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                className="mt-1 w-full rounded-xl border border-taupe-600/30 p-3"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-400 px-4 py-3 font-bold text-olive-100 cursor-pointer hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update avatar"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
