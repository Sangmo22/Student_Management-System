import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

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

    const newStudent = {
      id: Date.now(),
      ...trimmedData,
    };

    setStudents((prevStudents) => [newStudent, ...prevStudents]);
    setError("");

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

          <button type="submit">Add Student</button>
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
          <div className="student-list">
            {students.map((student) => (
              <article key={student.id} className="student-card">
                <h3>{student.fullName}</h3>
                <p>{student.email}</p>
                <p>Age: {student.age}</p>
                <p>Course: {student.course}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
