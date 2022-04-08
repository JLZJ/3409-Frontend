import React, {useState} from 'react'
import {ErrorMessage, Submit, ImageUploader, AwaitResults} from './Components'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

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
            'http://ec2-54-255-154-230.ap-southeast-1.compute.amazonaws.com:5000/predict/pneumonia',
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
