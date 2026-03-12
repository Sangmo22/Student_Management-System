import { useEffect, useState } from "react";
import "./App.css";

const STUDENTS_STORAGE_KEY = "student-manager-records";

function App() {
  const [students, setStudents] = useState(() => {
    try {
      const savedStudents = localStorage.getItem(STUDENTS_STORAGE_KEY);
      return savedStudents ? JSON.parse(savedStudents) : [];
    } catch {
      return [];
    }
  });
  const [error, setError] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    course: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setError("");

    if (name === "rollNo") {
      if (value === "") {
        setFormData((prevData) => ({ ...prevData, rollNo: "" }));
        return;
      }
      if (!/^\d+$/.test(value) || Number(value) < 1) return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      rollNo: formData.rollNo.trim(),
      course: formData.course.trim(),
    };

    if (!trimmedData.fullName || !trimmedData.email || !trimmedData.rollNo || !trimmedData.course) {
      setError("Please fill all fields before adding a student.");
      return;
    }

    if (Number(trimmedData.rollNo) <= 0) {
      setError("Roll No must be greater than 0.");
      return;
    }

    const isDuplicateRollNo = students.some(
      (student) => student.rollNo === trimmedData.rollNo && student.id !== editingStudentId,
    );

    if (isDuplicateRollNo) {
      setError("This Roll No is already assigned to another student.");
      return;
    }

    if (editingStudentId !== null) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudentId ? { ...student, ...trimmedData } : student,
        ),
      );
      setEditingStudentId(null);
    } else {
      const newStudent = { id: Date.now(), ...trimmedData };
      setStudents((prevStudents) => [newStudent, ...prevStudents]);
    }

    setError("");
    setFormData({ fullName: "", email: "", rollNo: "", course: "" });
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
    if (studentId === editingStudentId) {
      setEditingStudentId(null);
      setFormData({ fullName: "", email: "", rollNo: "", course: "" });
    }
  };

  const handleEditStudent = (student) => {
    setError("");
    setEditingStudentId(student.id);
    setFormData({
      fullName: student.fullName,
      email: student.email,
      rollNo: student.rollNo,
      course: student.course,
    });
  };

  const handleCancelEdit = () => {
    setError("");
    setEditingStudentId(null);
    setFormData({ fullName: "", email: "", rollNo: "", course: "" });
  };

  useEffect(() => {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredStudents = students.filter((student) => {
    if (!normalizedSearchTerm) return true;
    return (
      student.fullName.toLowerCase().includes(normalizedSearchTerm) ||
      student.email.toLowerCase().includes(normalizedSearchTerm) ||
      student.rollNo.toLowerCase().includes(normalizedSearchTerm) ||
      student.course.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  return (
    <main className="student-manager">
      <section className="student-form-section">
        <h1>Student Manager</h1>

        <form className="student-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" type="text" placeholder="Enter full name" value={formData.fullName} onChange={handleInputChange} />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />

          <div className="row-fields">
            <div className="field-group">
              <label htmlFor="rollNo">Roll No</label>
              <input id="rollNo" name="rollNo" type="number" min="1" step="1" placeholder="Enter roll number" value={formData.rollNo} onChange={handleInputChange} />
            </div>
            <div className="field-group">
              <label htmlFor="course">Course</label>
              <input id="course" name="course" type="text" placeholder="Enter course" value={formData.course} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">
              {editingStudentId !== null ? "Update Student" : "Add Student"}
            </button>
            {editingStudentId !== null && (
              <button type="button" className="cancel-edit-btn" onClick={handleCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </section>

      <section className="student-records-section">
        <div className="records-header">
          <h2>Student Records</h2>
          <span>{students.length} students</span>
        </div>

        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, roll no, or course"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        {students.length === 0 ? (
          <p>No student records yet.</p>
        ) : filteredStudents.length === 0 ? (
          <p>No matching students found.</p>
        ) : (
          <div className="table-wrap">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll No</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.course}</td>
                    <td>
                      <div className="action-buttons">
                        <button type="button" className="edit-btn" onClick={() => handleEditStudent(student)}>Edit</button>
                        <button type="button" className="delete-btn" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
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
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
