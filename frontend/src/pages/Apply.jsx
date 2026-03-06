import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function Apply() {

  const { jobId } = useParams();

  const [userId, setUserId] = useState("");

  const applyJob = async () => {

    const token = localStorage.getItem("token");

    try {

      await API.post(
        "/apply",
        {
          user_id: userId,
          job_id: jobId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Application submitted successfully");

    } catch (error) {

      alert("Application failed");

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Apply for Job</h2>

      <input
        type="number"
        placeholder="Enter your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <br /><br />

      <button onClick={applyJob}>
        Apply Now
      </button>

    </div>
  );
}