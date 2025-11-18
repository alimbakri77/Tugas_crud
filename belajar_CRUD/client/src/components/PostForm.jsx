import { useState, useEffect } from "react";
import { getUsers, createPost, updatePost } from "../services/api.js";

const PostForm = ({ post, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userid: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        userid: post.userid,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        userid: "",
      });
    }
  }, [post]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      userid: parseInt(formData.userid),
    };

    try {
      if (post) {
        await updatePost(post.id, data);
      } else {
        await createPost(data);
      }

      setFormData({
        title: "",
        content: "",
        userid: "",
      });

      onSuccess();
    } catch (error) {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{post ? "Edit" : "Tambah"} Post</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">User</label>
            <select
              name="userid"
              className="form-select"
              value={formData.userid}
              onChange={handleChange}
              required
            >
              <option value="">Pilih user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Simpan</button>

          {post && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setFormData({
                  title: "",
                  content: "",
                  userid: "",
                });
                onSuccess();
              }}
            >
              Batal
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostForm;
