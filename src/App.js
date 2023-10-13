import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
    return (
        <div className="app">
            <BrowserRouter basename="/sql-generatorrr">
                <Routes>
                    {publicRoutes.map((item, index) => {
                        const Comp = item.component;
                        return <Route key={index} path={item.path} element={<Comp />} />;
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
