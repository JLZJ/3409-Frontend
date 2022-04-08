import './App.css';
import './SelectionPage'
import logo from "./logo.png";
import {Route, Routes, useNavigate, useLocation, Navigate,} from "react-router-dom";
import SelectionPage from "./SelectionPage";
import DiabetesPage from "./DiabetesPage";
import CoronaryPage from "./CoronaryPage";
import CataractsPage from "./CataractsPage"
import PneumoniaPage from "./PneumoniaPage";
import StrokePage from "./StrokePage";
import ResultsPage from "./ResultsPage";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import RespiratoryPage from "./RespiratoryPage";

function App() {
    let navigate = useNavigate();
    let location = useLocation();
    return (
        <div className='hideScroll'>
            <div className="App-logo" onClick={()=>navigate('/')} >
                <img src={logo} className="logo" alt="logo"/>
            </div>
            <div className='App'>
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname}
                        classNames="transition"
                        timeout={500}
                    >
                        <Routes location={location}>
                            <Route exact path="/" element={<SelectionPage/>} />
                            <Route path="/diabetes" element={<DiabetesPage/>} />
                            <Route path="/stroke" element={<StrokePage/>} />
                            <Route path="/coronary" element={<CoronaryPage/>} />
                            <Route path="/cataracts" element={<CataractsPage/>} />
                            <Route path="/pneumonia" element={<PneumoniaPage/>} />
                            <Route path="/respiratory" element={<RespiratoryPage/>} />
                            <Route path="/results" element={<ResultsPage/>} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}

export default App;
