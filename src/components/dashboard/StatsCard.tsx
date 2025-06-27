interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <div className={`${color} rounded-xl p-6 text-white`}>
      <div className="flex items-center">
        <span className="text-3xl mr-4">{icon}</span>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;