import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    course: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setError("");

    if (name === "age") {
      if (value === "") {
        setFormData((prevData) => ({
          ...prevData,
          age: "",
        }));
        return;
      }

      // Accept only positive whole numbers for age.
      if (!/^\d+$/.test(value) || Number(value) < 1) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      age: formData.age.trim(),
      course: formData.course.trim(),
    };

    if (
      !trimmedData.fullName ||
      !trimmedData.email ||
      !trimmedData.age ||
      !trimmedData.course
    ) {
      setError("Please fill all fields before adding a student.");
      return;
    }

    if (Number(trimmedData.age) <= 0) {
      setError("Age must be greater than 0.");
      return;
    }

    if (editingStudentId !== null) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudentId
            ? { ...student, ...trimmedData }
            : student,
        ),
      );
      setEditingStudentId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        ...trimmedData,
      };

      setStudents((prevStudents) => [newStudent, ...prevStudents]);
    }

    setError("");

    setFormData({
      fullName: "",
      email: "",
      age: "",
      course: "",
    });
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== studentId),
    );

    if (studentId === editingStudentId) {
      setEditingStudentId(null);
      setFormData({
        fullName: "",
        email: "",
        age: "",
        course: "",
      });
    }
  };

  const handleEditStudent = (student) => {
    setError("");
    setEditingStudentId(student.id);
    setFormData({
      fullName: student.fullName,
      email: student.email,
      age: student.age,
      course: student.course,
    });
  };

  return (
    <main className="student-manager">
      <section className="student-form-section">
        <h1>Student Manager</h1>

        <form className="student-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <div className="row-fields">
            <div className="field-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                step="1"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="course">Course</label>
              <input
                id="course"
                name="course"
                type="text"
                placeholder="Enter course"
                value={formData.course}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit">
            {editingStudentId !== null ? "Update Student" : "Add Student"}
          </button>
          {error && <p>{error}</p>}
        </form>
      </section>

      <section className="student-records-section">
        <div className="records-header">
          <h2>Student Records</h2>
          <span>{students.length} students</span>
        </div>

        {students.length === 0 ? (
          <p>No student records yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => handleEditStudent(student)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
