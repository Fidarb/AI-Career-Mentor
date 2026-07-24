import { useState } from "react";
import { jsPDF } from "jspdf";
import "./Home.css";

const API_URL = import.meta.env.VITE_API_URL;
function Home() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [education, setEducation] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [certifications, setCertifications] = useState("");
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResponse("");

    try {
    const res = await fetch(`${API_URL}/career`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    skills,
    interests,
    education,
    studyYear,
    certifications,
    goal,
  }),
});

const data = await res.json();
      
      setResponse(data.answer);
    } catch (error) {
      console.error(error);
      setResponse("Unable to connect to backend.");
    }

    setLoading(false);
  };

  const downloadPDF = () => {
  const doc = new jsPDF();

  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 7;
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text("AI Career Mentor Report", margin, y);

  y += 15;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.text(`Name: ${name}`, margin, y);
  y += lineHeight;

  doc.text(`Education: ${education}`, margin, y);
  y += lineHeight;

  doc.text(`Current Year: ${studyYear}`, margin, y);
  y += lineHeight;

  doc.text(`Certifications: ${certifications}`, margin, y);
  y += lineHeight;

  doc.text(`Career Goal: ${goal}`, margin, y);
  y += 10;

  doc.setDrawColor(37, 99, 235);
  doc.line(margin, y, 190, y);

  y += 10;

  const lines = doc.splitTextToSize(response, 170);

  lines.forEach((line) => {
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }

    doc.text(line, margin, y);
    y += lineHeight;
  });

  doc.save(`${name || "Career"}_Report.pdf`);
};

  const formatResponse = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let bullets = [];

  const flushBullets = () => {
    if (bullets.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="report-list">
          {bullets}
        </ul>
      );
      bullets = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushBullets();
      return;
    }

    if (trimmed.startsWith("##")) {
      flushBullets();

      elements.push(
        <h3 key={index} className="report-heading">
          {trimmed.replace("##", "").trim()}
        </h3>
      );
    } else if (trimmed.startsWith("###")) {
      flushBullets();

      elements.push(
        <h4 key={index} className="report-subheading">
          {trimmed.replace("###", "").trim()}
        </h4>
      );
    } else if (trimmed.startsWith("-")) {
      bullets.push(
        <li key={index}>
          {trimmed.replace("-", "").trim()}
        </li>
      );
    } else {
      flushBullets();

      elements.push(
        <p key={index} className="report-paragraph">
          {trimmed}
        </p>
      );
    }
  });

  flushBullets();

  return elements;
};
    

  return (
    <div className="container">
      <div className="card">

       <h1>🤖 AI Career Mentor</h1>

<p className="subtitle">
  Discover your ideal career path with AI-powered insights,
  personalized recommendations, and a professional career roadmap.
</p>

        <label>👤 Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>💻 Skills</label>
        <textarea
          placeholder="Python, SQL, Machine Learning..."
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label>❤️ Interests</label>
        <textarea
          placeholder="Artificial Intelligence, Data Science..."
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <label>🎓 Education</label>
        <input
          type="text"
          placeholder="B.Tech AI & DS"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
        <label>📚 Current Year of Study</label>

         <select
         value={studyYear}
         onChange={(e) => setStudyYear(e.target.value)}
>
        <option value="" disabled>Select Year</option>
        <option>1st Year</option>
        <option>2nd Year</option>
        <option>3rd Year</option>
        <option>4th Year</option>
        <option>Graduate</option>
        <option>Working Professional</option>
</select>

<label>🏆 Certifications</label>

<textarea
  placeholder="Google Data Analytics, AWS Cloud Practitioner..."
  value={certifications}
  onChange={(e) => setCertifications(e.target.value)}
/>

        <label>🎯 Career Goal</label>
        <input
          type="text"
          placeholder="Become an AI Engineer"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading
            ? "⏳ Generating AI Career Report..."
            : "✨ Generate AI Career Report"}
        </button>

        {response && (
  <div className="response">
    <h2>📊 Your Personalized Career Report</h2>

    <div className="report-box">
      {formatResponse(response)}
    </div>

    <button
      onClick={downloadPDF}
      style={{ marginTop: "20px" }}
    >
      📄 Download Career Report
    </button>
  </div>
)}

      </div>
    </div>
  );
}

export default Home;
