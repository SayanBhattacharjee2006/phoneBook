import { BrowserRouter, Routes, Route } from "react-router-dom";

//Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Welcome from "./pages/auth/Welcome";

// Dashboard page
import Dashboard from "./pages/dashboard/Dashboard";

// Contacts
import ContactList from "./pages/contacts/ContactList";
import AddContact from "./pages/contacts/AddContact";
import ContactDetails from "./pages/contacts/ContactDetails";
import EditContact from "./pages/contacts/EditContact";

// Profile
import Profile from "./pages/profile/Profile";

// layouts
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/welcome" element={<Welcome />} />
                </Route>

                {/* App Routes */}
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/contacts" element={<ContactList />} />
                    <Route path="/contacts/new" element={<AddContact />} />
                    <Route path="/contacts/:id" element={<ContactDetails />} />
                    <Route
                        path="/contacts/:id/edit"
                        element={<EditContact />}
                    />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
