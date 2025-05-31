

function Mood({ mood, onDelete }) {
    const formattedDate = new Date(mood.created_at).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="mood-container bg-white p-4 rounded-lg shadow mb-3">
            <div className="flex justify-between items-start mb-2">
                <h3 className="mood-title font-medium text-lg capitalize">
                    {mood.mood_type || mood.title}
                </h3>
                <button 
                    className="delete-button text-red-500 hover:text-red-700 text-sm"
                    onClick={() => onDelete(mood.id)}
                >
                    Delete
                </button>
            </div>
            {mood.description && (
                <p className="mood-description text-gray-600 mb-2">
                    {mood.description}
                </p>
            )}
            <p className="mood-date text-sm text-gray-400">
                {formattedDate}
            </p>
        </div>
    );
}

export default Mood;