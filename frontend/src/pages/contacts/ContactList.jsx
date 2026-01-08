import { useEffect, useState } from "react";
import useContactStore from "../../store/contact.store";
import { Link } from "react-router-dom";

function ContactList() {
    const [query, setQuery] = useState("");

    const {
        contacts = [],
        loading,
        fetchContacts,
        toggleFavourite,
        searchContacts,
    } = useContactStore();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim()) {
                searchContacts(query);
            } else {
                fetchContacts();
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [query, searchContacts, fetchContacts]);

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

            {/* Search */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search contacts..."
                    className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />

                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="text-sm text-gray-500 hover:underline"
                    >
                        Clear
                    </button>
                )}
            </div>

            {loading && (
                <div className="text-sm text-gray-500">
                    Searching contacts...
                </div>
            )}

            {/* Empty state */}
            {/* No Results (Search) */}
            {!loading && query.trim() && contacts.length === 0 && (
                <div className="text-sm text-gray-500">
                    No contacts found for “{query}”.
                </div>
            )}

            {/* Empty State (No Contacts Yet) */}
            {!loading && !query.trim() && contacts.length === 0 && (
                <div className="text-sm text-gray-500">
                    No contacts yet. Create your first contact.
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
