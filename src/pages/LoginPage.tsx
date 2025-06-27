// ... (código anterior)
import logo from '../assets/images/logo.svg';

const LoginPage = () => {
  // ... (código anterior)
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightGray p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary py-8 px-10 text-center">
          <img 
            src={logo} 
            alt="BookNest Logo" 
            className="w-40 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-white">Iniciar Sesión en BookNest</h1>
        </div>
        
        {/* ... resto del código */}
      </div>
    </div>
  );
};

export default LoginPage;