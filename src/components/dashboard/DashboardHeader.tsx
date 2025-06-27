interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-primary">Bienvenido, {username}</h1>
      <p className="text-midnight mt-2">Aquí está tu resumen de actividades</p>
    </div>
  );
};

export default DashboardHeader;