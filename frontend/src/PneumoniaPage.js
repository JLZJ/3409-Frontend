import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AwaitResults, ErrorMessage, ImageUploader, Submit } from './Components';

function PneumoniaPage() {
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
        fetch(
            'http://aidoctor3409-env-1.eba-tdxhupka.ap-southeast-1.elasticbeanstalk.com:5000/predict/pneumonia',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                let statement = '';
                if (result.outcome==='Absent'){
                    statement = "Patient does not have a case of pneumonia"
                } else {
                    statement = "Patient likely having a case of pneumonia"
                }
                // console.log('Success:', result.outcome);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Pneumonia', result: statement} });
            })
            .catch((error) => {
                console.error('Error:', error);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Pneumonia', result: "Something went wrong... Try again later"} });;
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="PneumoniaPage" style={{height:'75vh'}}>
                <ImageUploader name='file' control={control} register={register}/>
                <Submit/>
                <ErrorMessage error={error}/>
                <AwaitResults waiting={query} />
            </div>
        </form>


    );

}

export default PneumoniaPage;
