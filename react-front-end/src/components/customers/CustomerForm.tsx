import React, {useState} from 'react';

interface CustomerFormProps {
    onAddCustomer: (newCustomer: { firstName: string; lastName: string; email: string }) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({onAddCustomer}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCustomer({firstName, lastName, email});
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2 border rounded mr-2"
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-2 border rounded mr-2"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded mr-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Customer
            </button>
        </form>
    );
};

export default CustomerForm;