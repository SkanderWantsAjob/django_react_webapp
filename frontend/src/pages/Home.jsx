import { useEffect, useState } from "react";
import api from '../api';
import Mood from "../components/Mood";
import MoodForm from "../components/MoodForm"; // We'll create this

function Home() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMoods();
  }, []);

  const getMoods = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/mood/");
      setMoods(response.data);
    } catch (err) {
      setError("Failed to load moods");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMood = async (id) => {
    try {
      await api.delete(`/api/mood/delete/${id}/`);
      setMoods(moods.filter(mood => mood.id !== id));
    } catch (err) {
      alert("Failed to delete mood");
      console.error(err);
    }
  };

  const handleAddMood = async (newMood) => {
    try {
      const response = await api.post("/api/mood/", newMood);
      setMoods([response.data, ...moods]);
      return true;
    } catch (err) {
      alert("Failed to create mood");
      console.error(err);
      return false;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Mood Tracker</h1>
      
      {/* Mood Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        <MoodForm onAddMood={handleAddMood} />
      </div>

      {/* Mood List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Mood History</h2>
        {loading ? (
          <p>Loading moods...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : moods.length === 0 ? (
          <p>No moods recorded yet. Add your first mood!</p>
        ) : (
          <div className="space-y-4">
            {moods.map((mood) => (
              <Mood 
                mood={mood} 
                onDelete={deleteMood} 
                key={mood.id} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;