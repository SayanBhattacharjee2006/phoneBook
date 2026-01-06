import { Outlet, useNavigate, NavLink } from "react-router-dom";
import Button from "../components/Button";
import useAuthStore from "../store/auth.store";

function AppLayout() {
  const navigate = useNavigate();
  const { logout, loading, user } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-medium"
      : "text-gray-600 hover:text-primary";

  return (
    <div>
      <header className="border-b bg-white">
        <div className="flex flex-wrap items-center justify-between px-6 py-4 gap-4">

          <div className="flex items-center gap-8">
            <h3 className="font-semibold text-lg">Contact Book</h3>

            <nav className="flex items-center gap-4 text-sm">
              <NavLink to="/" end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/contacts" className={linkClass}>
                Contacts
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-600">
                {user.name || user.email}
              </span>
            )}

            <Button disabled={loading} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
