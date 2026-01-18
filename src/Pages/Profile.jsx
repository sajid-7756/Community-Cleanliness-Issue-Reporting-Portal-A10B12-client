import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Container from "../Components/Container";
import toast from "react-hot-toast";
import { Camera, Mail, User, ShieldCheck } from "lucide-react";

const Profile = () => {
  const { user, updateProfileFunc } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfileFunc(name, photoURL)
      .then(() => {
        toast.success("Profile Updated Successfully");
        setIsEditing(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="py-20 bg-base-200/50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Cover Header */}
          <div className="h-48 bg-linear-to-r from-primary to-secondary rounded-t-[3rem] shadow-xl relative">
            <div className="absolute -bottom-16 left-8 md:left-16">
              <div className="relative group">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/CpHdF8h2/icons8-user.gif"
                  }
                  alt={user?.displayName}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-8 border-base-100 object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 bg-base-100 rounded-b-[3rem] p-8 md:p-16 shadow-2xl border border-base-300">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-black text-secondary">
                    {user?.displayName}
                  </h1>
                  <span className="badge badge-primary badge-lg gap-2 font-bold py-4">
                    <ShieldCheck size={16} />
                    Verified Member
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 text-base-content/60">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-primary" />
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-primary" />
                    Community Member
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`btn btn-lg rounded-2xl px-8 shadow-lg transition-all ${
                  isEditing
                    ? "btn-ghost border-base-300"
                    : "btn-primary shadow-primary/20"
                }`}
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            <div className="divider my-12 opacity-10"></div>

            {isEditing ? (
              <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in text-secondary"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Display Name</span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                      size={20}
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input input-bordered input-lg w-full pl-12 rounded-2xl focus:input-primary transition-all bg-base-200/50 border-transparent focus:bg-base-100"
                      required
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Photo URL</span>
                  </label>
                  <div className="relative">
                    <Camera
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
                      size={20}
                    />
                    <input
                      type="text"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="input input-bordered input-lg w-full pl-12 rounded-2xl focus:input-primary transition-all bg-base-200/50 border-transparent focus:bg-base-100"
                      required
                    />
                  </div>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full md:w-auto px-12 rounded-2xl shadow-xl shadow-primary/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-secondary">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold border-b border-base-200 pb-3 flex items-center gap-2">
                    <User className="text-primary" size={20} />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <span className="font-bold text-base-content/50">
                      Full Name:
                    </span>
                    <span className="font-medium text-base-content">
                      {user?.displayName}
                    </span>

                    <span className="font-bold text-base-content/50">
                      Email:
                    </span>
                    <span className="font-medium text-base-content">
                      {user?.email}
                    </span>

                    <span className="font-bold text-base-content/50">
                      Joined:
                    </span>
                    <span className="font-medium text-base-content">
                      {user?.metadata?.creationTime
                        ? new Date(
                            user.metadata.creationTime
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
