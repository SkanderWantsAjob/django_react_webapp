import { useState } from 'react';
import api from "../api";
import "../styles/MoodForm.css";

const moods = [
  { emoji: '🤩', label: 'Excited', color: 'purple' },
  { emoji:'🥰', label: 'Loved', color: 'pink' },
  { emoji: '😊', label: 'Happy', color: 'yellow' },
  { emoji: '😐', label: 'Neutral', color: 'blue' },
  { emoji:'😰' , label: 'Anxious', color: 'indigo' },
  { emoji: '😢', label: 'Sad', color: 'red' },
  { emoji:'😠' , label: 'Angry', color: 'orange' },
  { emoji:'😴', label: 'Tired', color: 'gray' },
  { emoji: '😲', label: 'Surprised', color: 'green' },
];


export default function MoodForm() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedMood){
      try {
        const response = await api.post('/mood', {
          mood_type: selectedMood.label.toLowercase(),
          title:title,
          description:description
        }) 

      }
      catch(error){

      }
      console.log('submitted' , {'mood' :selectedMood, description, title});

    }

    setSelectedMood(null);
    

  }

  return (
    <div className='form-mood-container'>

    <div className="mood-grid ">
      {moods.map((mood) => (
        <button
          key={mood.label}
          type="button"
          onClick={() => setSelectedMood(mood)}
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
