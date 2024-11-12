import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AccountForm from './AccountForm';

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface Account {
    accountId: string;
    balance: number;
    createdAt: string;
    currency: string;
    type: string;
    customer: Customer;
    customerId: number;
}

const AccountList: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:8888/ACCOUNT-SERVICE/accounts');
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const addAccount = async (newAccount: { balance: number; currency: string; type: string; customerId: number }) => {
        try {
            const account: Account = {
                accountId: (accounts.length + 1).toString(),
                balance: newAccount.balance,
                createdAt: new Date().toISOString(),
                currency: newAccount.currency,
                type: newAccount.type,
                customer: {id: newAccount.customerId, firstName: 'John', lastName: 'Doe', email: 'john@doe'},
                customerId: newAccount.customerId,
            };
            const response = await axios.post('http://localhost:8888/ACCOUNT-SERVICE/accounts', account);
            setAccounts([...accounts, response.data]);
        } catch (error) {
            console.error('Error adding account:', error);
        }
    };

    const deleteAccount = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                await axios.delete(`http://localhost:8888/ACCOUNT-SERVICE/accounts/${id}`);
                setAccounts(accounts.filter(account => account.accountId !== id));
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    const startEditing = (id: string) => {
        setEditingId(id);
    };

    const saveEdit = async (id: string, newBalance: number) => {
        try {
            const updatedAccount = {balance: newBalance};
            const response = await axios.put(`http://localhost:8888/ACCOUNT-SERVICE/accounts/${id}`, updatedAccount);
            setAccounts(accounts.map(account =>
                account.accountId === id ? response.data : account
            ));
            setEditingId(null);
        } catch (error) {
            console.error('Error saving account:', error);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const filteredAccounts = accounts.filter(account =>
        account.customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Account List</h2>
            <AccountForm onAddAccount={addAccount}/>
            <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded"
            />
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Balance</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((account) => (
                    <tr key={account.accountId}>
                        <td className="py-2 px-4 border-b">{account.accountId}</td>
                        <td className="py-2 px-4 border-b">
                            {account.customer.firstName} {account.customer.lastName}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingId === account.accountId ? (
                                <input
                                    type="number"
                                    defaultValue={account.balance}
                                    className="p-1 border rounded"
                                    id={`balance-${account.accountId}`}
                                />
                            ) : (
                                `$${account.balance.toFixed(2)}`
                            )}
                        </td>
                        <td className="py-2 px-4 border-b">
                            {editingId === account.accountId ? (
                                <>
                                    <button
                                        onClick={() => {
                                            const balanceInput = document.getElementById(`balance-${account.accountId}`) as HTMLInputElement;
                                            saveEdit(account.accountId, parseFloat(balanceInput.value));
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
                                        onClick={() => startEditing(account.accountId)}
                                        className="bg-blue-500 text-white p-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteAccount(account.accountId)}
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

export default AccountList;