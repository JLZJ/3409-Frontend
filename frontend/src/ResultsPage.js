import React from 'react'
import {useLocation} from "react-router-dom";

function ResultsPage() {
    const location = useLocation();
    let prevPage = '';
    let result = '';
    if (location.state) {
        prevPage = location.state.prevPage;
        result = location.state.result;
    }

    return (

        <div className="ResultsPage" style={{height:'75vh', width:'30vw'}}>

            <h1>Results Page</h1>

            <div>{prevPage}</div>
            <div>{result}</div>

        </div>

    );

}

export default ResultsPage;
