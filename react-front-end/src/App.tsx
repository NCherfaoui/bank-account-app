import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import AccountList from './components/accounts/AccountList';
import CustomerList from './components/customers/CustomerList';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="bg-gray-800 p-4">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        </li>
                        <li>
                            <Link to="/accounts" className="text-white hover:text-gray-300">Accounts</Link>
                        </li>
                        <li>
                            <Link to="/customers" className="text-white hover:text-gray-300">Customers</Link>
                        </li>
                    </ul>
                </nav>

                <h1 className="text-3xl font-bold text-center my-4">React Front-end</h1>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/accounts" element={<AccountList/>}/>
                    <Route path="/customers" element={<CustomerList/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return <h2 className="text-2xl text-center">Welcome to the Home Page</h2>;
}

export default App;