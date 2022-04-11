import React, {useState} from 'react'
import {ErrorMessage, Submit, ImageUploader, AwaitResults} from './Components'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

function CataractsPage() {
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
            'http://127.0.0.1:5000/predict/cataract',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log('Success:', result.outcome);
                let statement = '';
                if (result.outcome==='Absent'){
                    statement = "Patient's eye looks unremarkable, unlikely to have cataracts"
                } else {
                    statement = "Abnormality detected, patient is likely to have cataracts"
                }
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Cataracts', result: statement} });
            })
            .catch((error) => {
                // console.error('Error:', error);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Cataracts', result: "Something went wrong... Try again later"} });
            });
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="CataractsPage" style={{height:'75vh'}}>
                <ImageUploader name='file' control={control} register={register}/>
                <Submit/>
                <ErrorMessage error={error}/>
                <AwaitResults waiting={query} />
            </div>
        </form>


    );

}

export default CataractsPage;
