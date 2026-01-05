import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function AppLayout() {
    const navigate = useNavigate();

    return (
        <div>
            <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
                <h3 className="font-semibold text-lg">ContactBook</h3>
                <Button
                    className="text-sm text-primary hover:underline"
                    onClick={() => navigate("/login")}
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
