import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo, editTodo } from "../utils/data-todos"; // Pastikan path ini benar
import Swal from "sweetalert2"; // Pastikan Anda mengimpor SweetAlert2

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    is_finished: 0,
  });

  useEffect(() => {
    const existingTodo = getTodo(Number(id));
    if (existingTodo) {
      setTodo(existingTodo);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todo tidak ditemukan!",
      });
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo({ ...todo, id: Number(id) }); // Memperbarui todo dengan ID
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo berhasil diperbarui!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Todo</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Judul:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deskripsi:</label>
          <textarea
            name="description"
            className="form-control"
            value={todo.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Kembali
        </button>
      </form>
    </div>
  );
}

export default EditPage;
