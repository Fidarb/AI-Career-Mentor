const handleSubmit = async () => {
  setLoading(true);
  setResponse("");

  try {
    const res = await fetch(
      "https://ai-career-mentor-backend-7bl6.onrender.com/career",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          skills,
          interests,
          education,
          goal,
        }),
      }
    );

    const data = await res.json();
    setResponse(data.answer);
  } catch (error) {
    console.error(error);
    setResponse("Unable to connect to backend.");
  }

  setLoading(false);
};