import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="display-4">Page Not Found</h2>
        <p className="lead mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <div>
          <button 
            className="btn btn-primary btn-lg me-2"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <button 
            className="btn btn-success btn-lg"
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;