import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
}

const Rating: React.FC<RatingProps> = ({ value, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg'
  };
  
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className={`flex items-center ${sizeClasses[size]} text-booknest-accent`}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      
      {halfStar && <FaStarHalfAlt />}
      
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default Rating;