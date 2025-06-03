import { useState } from 'react';
import { moods } from '../constants';
import "../styles/Colors.css";
import "../styles/MoodForm.css";




export default function MoodForm( {onBgColorChange, onAddMood}) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const moodColorMap = moods.reduce((map, mood) => {
    map[mood.label.toLowerCase()] = mood.color;
    return map;
  }, {});

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // Change background when mood is selected
    constmod=moodColorMap[mood.label.toLowerCase()]
    console.log({mod})
    onBgColorChange(moodColorMap[mood.label.toLowerCase()] || 'home-bg');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedMood && onAddMood) {
      const newMood = {
        mood_type: selectedMood.label.toLowerCase(),
        title,
        description
      };
  
      const success = await onAddMood(newMood);
  
      if (success) {
        setSelectedMood(null);
        setTitle('');
        setDescription('');
      } else {
        setError('Failed to save mood. Please try again.');
      }
    }
  };

  return (
    <div className='form-mood-container glass'>

    <div className="mood-grid ">
      {moods.map((mood) => (
        <button
          key={mood.label}
          type="button"
          onClick={() => handleMoodSelect(mood)}
          className={`mood-button ${mood.color} ${
            selectedMood?.label === mood.label ? 'selected' : ''
          }`}
        >
          {mood.emoji}
        </button>
      ))}
    </div>
    <div>
      {selectedMood && (
        <div className={`mood-form ${selectedMood.color}`}>
          <h3>
            feeling {selectedMood.label} ? Tell me more !
          </h3>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
          <input 
          type='text'
          value={title}
          placeholder='title'

          onChange={(e) => setTitle(e.target.value)}>

          </input>
          <textarea 
          placeholder="details of your mood.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          >

           
          </textarea>
          </div>
          <div className='form-buttons'>
            
          <button
            type='button'
            onClick={() => setSelectedMood(null)}
            className="button-82-pushable" role="button">
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">
              cancel
            </span>
          </button>

            <button
              type='submit'
              className='button-50'>
                Save

            </button>
          </div>

        </form>

     
    </div>
      )}
    </div>
    </div>
  );
}
