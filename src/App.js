import { useState } from 'react';
import CreateDatabase from './components/CreateDatabase';
import ViewSQLStatement from './components/ViewSQLStatement';
function App() {
    const [sqlStatement, setSqlStatement] = useState('');
    return (
        <div className="app">
            <div className="container">
                <CreateDatabase setSqlStatement={setSqlStatement} />
                <ViewSQLStatement sqlStatement={sqlStatement} />
            </div>
        </div>
    );
}

export default App;
