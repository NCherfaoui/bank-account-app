import React, {useState} from 'react';

interface AccountFormProps {
    onAddAccount: (newAccount: { balance: number; currency: string; type: string; customerId: number }) => void;
}

const AccountForm: React.FC<AccountFormProps> = ({onAddAccount}) => {
    const [balance, setBalance] = useState(0);
    const [currency, setCurrency] = useState('EUR');
    const [type, setType] = useState('CURRENT_ACCOUNT');
    const [customerId, setCustomerId] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddAccount({balance, currency, type, customerId});
        setBalance(0);
        setCurrency('EUR');
        setType('CURRENT_ACCOUNT');
        setCustomerId(1);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="number"
                placeholder="Balance"
                value={balance}
                onChange={(e) => setBalance(parseFloat(e.target.value))}
                className="p-2 border rounded mr-2"
                required
            />
            <input
                type="text"
                placeholder="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border rounded mr-2"
                required
            />
            <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-2 border rounded mr-2"
                required
            />
            <input
                type="number"
                placeholder="Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(parseInt(e.target.value))}
                className="p-2 border rounded mr-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Account
            </button>
        </form>
    );
};

export default AccountForm;