
import { moods } from "../constants";
import "../styles/Colors.css";
import '../styles/Mood.css';


function Mood({ mood, onDelete, onClick }) {
    const formattedDate = new Date(mood.created_at).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const moodData = moods.find(m => m.label.toLowerCase() === mood.mood_type.toLowerCase()) || {};

    return (
        <div className={`mood-entry ${moodData?.color}-light`} onClick={onClick}>
            
            <div className="mood-header">
                <h3 className="mood-title">
                    { mood.title} 
                </h3>
                <h3 className='mood-title'>
                    {mood.mood_type}
                </h3>
                <button 
                    className="delete-btn"
                    onClick={() => onDelete(mood.id)}
                >
                    Delete
                </button>
            </div>
            {mood.description && (
                <p className="mood-description">
                    {mood.description}
                </p>
            )}
            <p className="mood-date">
                {formattedDate}
            </p>
        </div>
    );
}

export default Mood;