import { useEffect, useRef, useState } from "react";
import api from '../api';
import Mood from "../components/Mood";
import MoodForm from "../components/MoodForm";
import { moods } from "../constants";
import '../styles/Colors.css';

function Home() {
  const [moods_data, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState('home-bg');
  const bgRef = useRef();

  
  useEffect(() => {
    getMoods();
  }, []);

  const moods_const= moods

  const moodColorMap = moods_const.reduce((map, mood) => {
    map[mood.label.toLowerCase()] = mood.color;
    return map;
  }, {});
 



  const handleBgColorChange= (color) => {
    document.body.className = `${color}-light`; 
    document.body.classList.add(color);
    document.body.style.transition = 'background-color 1s ease';

    const el = bgRef.current;
    if (!el) return;
    el.className = `${color}-light`;
    el.classList.add(color);
    el.style.transition = 'background-color 1s ease';
  }
  

  

 
  const getMoods = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/mood/");
      setMoods(response.data);
      console.log(response.data)
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
      setMoods(moods_data.filter(mood => mood.id !== id));
    } catch (err) {
      alert("Failed to delete mood");
      console.error(err);
    }
  };

  const handleAddMood = async (newMood) => {
    try {
      const response = await api.post("/api/mood/", newMood);
      setMoods([response.data, ...moods_data]);
      console.log("yes")
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
      <div ref={bgRef} className="bg-white rounded shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        <MoodForm onBgColorChange={handleBgColorChange} onAddMood={handleAddMood} />
      </div>

      {/* Mood List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Mood History</h2>
        {loading ? (
          <p>Loading moods...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : moods_data.length === 0 ? (
          <p>No moods recorded yet. Add your first mood!</p>
        ) : (
          <div className="space-y-4">
            {moods_data.map((mood) => (
              <Mood 
                mood={mood} 
                onDelete={deleteMood} 
                key={mood.id}
                onClick={() => {
                  console.log(mood.mood_type)
                  const moodColor = moodColorMap[mood.mood_type];
                  
                  console.log(moodColor)
                  handleBgColorChange(moodColor)
                }
              }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;