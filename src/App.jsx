import "./App.css";

function App() {
  return (
    <main className="student-manager">
      <section className="student-form-section">
        <h1>Student Manager</h1>

        <form
          className="student-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter full name"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
          />

          <div className="row-fields">
            <div className="field-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="Enter age"
              />
            </div>

            <div className="field-group">
              <label htmlFor="course">Course</label>
              <input
                id="course"
                name="course"
                type="text"
                placeholder="Enter course"
              />
            </div>
          </div>

          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="student-records-section">
        <div className="records-header">
          <h2>Student Records</h2>
          <span>0 students</span>
        </div>

        <p>No student records yet.</p>
      </section>
    </main>
  );
}

export default App;
