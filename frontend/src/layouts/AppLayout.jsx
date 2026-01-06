import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuthStore from "../store/auth.store";

function AppLayout() {
    const navigate = useNavigate();
    const {logout, loading} = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login")
        } catch (error) {
            console.error("Logout failed",error)
        }
    }
    return (
        <div>
            <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
                <h3 className="font-semibold text-lg">ContactBook</h3>
                <Button
                    disabled={loading}
                    onClick={handleLogout}
                    className="text-sm text-primary hover:underline"
                >
                    Logout
                </Button>
                <main>
                    <Outlet />
                </main>
            </header>
        </div>
    );
}

export default AppLayout;
