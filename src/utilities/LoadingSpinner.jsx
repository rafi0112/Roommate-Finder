import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ fullScreen = false }) => {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'py-8'}`}>
      <FaSpinner className="animate-spin text-4xl text-indigo-600" />
    </div>
  );
};

export default LoadingSpinner;