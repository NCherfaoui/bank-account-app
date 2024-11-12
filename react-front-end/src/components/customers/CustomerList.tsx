import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8888/CUSTOMER-SERVICE/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const addCustomer = async (newCustomer: { firstName: string; lastName: string; email: string }) => {
        try {
            const response = await axios.post('http://localhost:8888/CUSTOMER-SERVICE/customers', newCustomer);
            setCustomers([...customers, response.data]);
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const deleteCustomer = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://localhost:8888/CUSTOMER-SERVICE/customers/${id}`);
                setCustomers(customers.filter(customer => customer.id !== id));
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    const startEditing = (id: number) => {
        setEditingId(id);
    };

    const saveEdit = async (id: number, newFirstName: string, newLastName: string, newEmail: string) => {
        try {
            const updatedCustomer = {firstName: newFirstName, lastName: newLastName, email: newEmail};
            const response = await axios.put(`http://localhost:8888/CUSTOMER-SERVICE/customers/${id}`, updatedCustomer);
            setCustomers(customers.map(customer =>
                customer.id === id ? response.data : customer
            ));
            setEditingId(null);
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Customer List</h2>
            <CustomerForm onAddCustomer={addCustomer}/>
            <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded"
            />
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">First Name</th>
                    <th className="py-2 px-4 border-b">Last Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((customer) => (
                    <tr key={customer.id}>
                        <td className="py-2 px-4 border-b">{customer.id}</td>
                        <td className="py-2 px-4 border-b">
                            {editingId === customer.id ? (
                                <input
                                    type="text"
                                    defaultValue={customer.firstName}
                                    className="p-1 border rounded"
                                    id={`firstName-${customer.id}`}
                                />
                            ) : (
                                customer.firstName
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingId === customer.id ? (
                                <input
                                    type="text"
                                    defaultValue={customer.lastName}
                                    className="p-1 border rounded"
                                    id={`lastName-${customer.id}`}
                                />
                            ) : (
                                customer.lastName
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingId === customer.id ? (
                                <input
                                    type="email"
                                    defaultValue={customer.email}
                                    className="p-1 border rounded"
                                    id={`email-${customer.id}`}
                                />
                            ) : (
                                customer.email
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingId === customer.id ? (
                                <>
                                    <button
                                        onClick={() => {
                                            const firstNameInput = document.getElementById(`firstName-${customer.id}`) as HTMLInputElement;
                                            const lastNameInput = document.getElementById(`lastName-${customer.id}`) as HTMLInputElement;
                                            const emailInput = document.getElementById(`email-${customer.id}`) as HTMLInputElement;
                                            saveEdit(customer.id, firstNameInput.value, lastNameInput.value, emailInput.value);
                                        }}
                                        className="bg-green-500 text-white p-1 rounded mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="bg-gray-500 text-white p-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => startEditing(customer.id)}
                                        className="bg-blue-500 text-white p-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="bg-red-500 text-white p-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4">
                {Array.from({length: totalPages}, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`mx-1 px-3 py-1 border rounded ${
                            currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomerList;