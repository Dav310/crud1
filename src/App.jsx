import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    title: ""
  });

  useEffect(() => {
    const storedData = localStorage.getItem("employeeData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      const updatedData = data.map(item =>
        item.id === editingId ? { ...item, ...formData } : item
      );
      setData(updatedData);
      localStortitle.setItem("employeeData", JSON.stringify(updatedData));
      setEditingId(null);
    } else {
      const newData = {
        id: Date.now(),
        fname: formData.fname,
        lname: formData.lname,
        title: formData.title
      };

      const updatedData = [...data, newData];
      setData(updatedData);
      localStortitle.setItem("employeeData", JSON.stringify(updatedData));
    }

    setFormData({
      fname: "",
      lname: "",
      title: ""
    });
  };

  const handleEdit = (id) => {
    const selectedEmployee = data.find(item => item.id === id);
    if (selectedEmployee) {
      setFormData({
        fname: selectedEmployee.fname,
        lname: selectedEmployee.lname,
        title: selectedEmployee.title
      });
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    localStortitle.setItem("employeeData", JSON.stringify(updatedData));
  };

  return (
    <>
      <h1 className="text-center">CRUD Operation</h1>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="fname" className="form-label">First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="lname" className="form-label">Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="form-control"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>

        <table className="table table-hover mt-5">
          <thead className="table-dark text-center">
            <tr>
              <td>Sr No.</td>
              <td>Id</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Title</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody className="table-light text-center">
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.title}</td>
                <td>
                  <button className="btn btn-warning me-1" onClick={() => handleEdit(item.id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
