import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AudioUploader, AwaitResults, ErrorMessage, Submit } from './Components';

function RespiratoryPage() {
    const { register, handleSubmit, control, } = useForm();
    const [error, showError] = useState(false);
    const [query, changeQueryingState] = useState(false);
    let navigate = useNavigate();
    const onSubmit = (values) =>{

        for (var key in values) {
            if (values[key]===undefined || values[key]===''){
                console.log(key);
                showError(true);
                showError(false); // this is to reinitialize to false
                return;
            }
        }
        changeQueryingState(true);
        let formData = new FormData();
        formData.append( "file", values.file, values.file.name)
        console.log(formData)
        fetch(
            'http://aidoctor3409-env-1.eba-tdxhupka.ap-southeast-1.elasticbeanstalk.com:5000/predict/respiratory',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                let statement = '';
                if (result.outcome==='Healthy'){
                    statement = "Patient has a healthy respiratory system"
                } else if (result.outcome==="Respiratory Tract Infection") {
                    statement = "Patient is likely to have a common respiratory tract infection"
                } else {
                    statement = "Patient is likely to have a chronic obstructive pulmonary disease"
                }
                // console.log('Success:', result.outcome);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Respiratory Tract Infection', result: statement} });
            })
            .catch((error) => {
                // console.error('Error:', error);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Respiratory Tract Infection', result: "Something went wrong... Try again later"} });
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="RespiratoryPage" style={{height:'75vh'}}>
                <AudioUploader name='file' control={control} register={register}/>
                <Submit/>
                <ErrorMessage error={error}/>
                <AwaitResults waiting={query} />
            </div>
        </form>


    );

}

export default RespiratoryPage;
