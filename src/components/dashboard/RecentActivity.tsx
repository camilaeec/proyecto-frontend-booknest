interface ActivityItem {
  id: number;
  title: string;
  date: string;
  type: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-center border-b border-lightGray pb-3">
          <div className="bg-accent rounded-full p-2 mr-4">
            <span className="text-white text-sm">
              {activity.type === 'book' ? '📚' : '🔄'}
            </span>
          </div>
          <div>
            <h4 className="font-medium">{activity.title}</h4>
            <p className="text-sm text-midnight">{activity.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;