import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Leaf } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="app-gradient min-h-screen flex items-center justify-center p-5">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center">
          <Leaf className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-6xl font-extrabold text-white mb-3">404</h1>
        <p className="text-lg text-white/60 mb-6">Oops! Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 transition-all hover:scale-[1.02]"
        >
          🌾 Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
