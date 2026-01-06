import { useEffect } from "react";
import useContactStore from "../../store/contact.store";
import { Link } from "react-router-dom";

function ContactList() {
    const { contacts = [], loading, fetchContacts, toggleFavourite } =
        useContactStore();

    useEffect(() => {
        fetchContacts();
        console.log(contacts)
    }, [fetchContacts]);


    if (loading) {
        return <div className="p-6">loading Contacts</div>;
    }
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Contacts</h1>
                <Link
                    to="/contacts/new"
                    className="text-sm text-primary hover:underline"
                >
                    + Add Contact
                </Link>
            </div>


            {/* Empty state */}
            {contacts.length === 0 && (
                <div className="text-sm text-gray-500">
                    No contacts found. Create your first contact.
                </div>
            )}


            {/* Contact list */}
            <ul className="divide-y border rounded-lg">
                {contacts.map((contact) => (
                    <li
                        key={contact._id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                        <Link
                            to={`/contacts/${contact._id}`}
                            className="flex flex-col"
                        >
                            <span className="font-medium">
                                {contact.firstName} {contact.lastName}
                            </span>
                            {contact.company && (
                                <span className="text-sm text-gray-500">
                                    {contact.company}
                                </span>
                            )}
                        </Link>

                        {/* favourite toggle */}
                        <button
                            onClick={() => toggleFavourite(contact._id)}
                            className="text-sm"
                            title="Toggle favourite"
                        >
                            {contact.isFavourite ? "★" : "☆"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
