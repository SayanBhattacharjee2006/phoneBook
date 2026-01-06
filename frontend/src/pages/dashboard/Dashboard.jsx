import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth.store";

function Dashboard() {
    const { user } = useAuthStore();
    return (
        <div className="p-6 space-y-6">
            {/* Greeting */}
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold">
                    Welcome{user?.name ? `, ${user.name}` : ""}
                </h1>
                <p className="text-sm text-gray-600">
                    Manage your contacts easily and securely.
                </p>
            </div>

            {/* Quick Actions */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    to="/contacts"
                    className="border rounded-lg p-4 hover:border-primary transition"
                >
                    <h3 className="font-medium">View Contacts</h3>
                    <p className="text-sm text-gray-500">
                        Browse and manage all your saved contacts
                    </p>
                </Link>

                <Link
                    to="/contacts/new"
                    className="border rounded-lg p-4 hover:border-primary transition"
                >
                    <h3 className="font-medium">Add New Contact</h3>
                    <p className="text-sm text-gray-500">
                        Create a new contact with phone, email, and address
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
