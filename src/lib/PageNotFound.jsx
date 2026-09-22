import { Link, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center max-w-lg">
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
          404 Error
        </p>

        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mb-2">
          The page you're looking for doesn't exist.
        </p>

        <p className="text-xs text-muted-foreground mb-8 break-all">
          {location.pathname}
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
