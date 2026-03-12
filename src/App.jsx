import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    course: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStudent = {
      id: Date.now(),
      ...formData,
    };

    setStudents((prevStudents) => [newStudent, ...prevStudents]);

    setFormData({
      fullName: "",
      email: "",
      age: "",
      course: "",
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

          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="student-records-section">
        <div className="records-header">
          <h2>Student Records</h2>
          <span>{students.length} students</span>
        </div>

        <p>No student records yet.</p>
      </section>
    </main>
  );
}

export default App;
