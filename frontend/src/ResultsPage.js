import React from 'react'
import {useLocation} from "react-router-dom";
import {DoctorComments, Result} from "./Components";
import Pdf from "react-to-pdf";
import {Button} from "@material-ui/core";

function ResultsPage() {
    const location = useLocation();
    let prevPage = '';
    let result = '';
    if (location.state) {
        prevPage = location.state.prevPage;
        result = location.state.result;
    }
    const options = {
        unit: 'in',
        format: [8.27,11.69],
        margins: {
            top: 40,
            left: 40,
        }
    };
    const ref = React.createRef();

    return (

        <div className="ResultsPage" style={{height:'75vh', width:'30vw'}}>
            <div ref={ref} style={{leftPadding:'15px', topPadding:'15px', width:'100%'}}>
                <h1>{prevPage}</h1>
                <Result results={result}/>
                <DoctorComments/>
            </div>
            <Pdf targetRef={ref} filename="results.pdf" options = {options} >
                {({ toPdf }) => <Button onClick={toPdf} variant={"contained"} style={{marginTop:'15px'}}>Generate Pdf</Button>}
            </Pdf>
        </div>

    );

}

export default ResultsPage;
