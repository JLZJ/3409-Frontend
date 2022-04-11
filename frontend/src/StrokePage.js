import React, {useState} from 'react'
import {FormInputDropdown, FormNumberInput, ErrorMessage, SubmitAndReset, AwaitResults} from './Components'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

function StrokePage() {
    const { register, handleSubmit, control,  reset } = useForm();
    const [error, showError] = useState(false);
    const [query, changeQueryingState] = useState(false);
    let navigate = useNavigate();
    const onSubmit = (values) =>{
        for (var key in values) {
            if (values[key]===undefined || values[key]===''){
                showError(true);
                showError(false); // this is to reinitialize to false
                return;
            }
        }
        changeQueryingState(true);
        fetch(
            'http://127.0.0.1:5000/predict/stroke?' + new URLSearchParams(values),
            { method: 'GET', }
        )
            .then((response)=> response.json())
            .then((result) => {
                let statement = '';
                if (result.outcome==='Absent'){
                    statement = "Patient does not show signs of a stroke"
                } else {
                    statement = "Patient is showing signs of stroke"
                }
                // console.log('Success:', result.outcome);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Stroke', result: statement} });
            })
            .catch((error) => {
                console.error('Error:', error);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Stroke', result: "Something went wrong... Try again later"} });
            });
    }

    const options_Gender = [
        { label: "Male", value: "Male", },
        { label: "Female", value: "Female", },
    ];

    const options_Hypertension = [
        { label: "Present", value: "Present", },
        { label: "Absent", value: "Absent", },
    ];

    const options_CoronaryArteryDisease = [
        { label: "Present", value: "Present", },
        { label: "Absent", value: "Absent", },
    ];

    const options_Smoking = [
        { label: "Smokes", value: "smokes", },
        { label: "Formerly smoked", value: "formerly smoked", },
        { label: "Never smoked", value: "never smoked", },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="StrokePage" style={{height:'75vh'}}>
                <FormInputDropdown name={'gender'} control={control} question="What is the patient's gender?" options={options_Gender} register={register}/>
                <FormNumberInput name={'age'} control={control} question="What is the patient's age?" register={register}/>
                <FormInputDropdown name={'hypertension'} control={control} question="Does patient have a history of hypertension?" options={options_Hypertension} register={register}/>
                <FormInputDropdown name={'corornary_artery_disease'} control={control} question="Does patient have a history of coronary artery disease?" options={options_CoronaryArteryDisease} register={register}/>
                <FormNumberInput name={'glucose_level'} control={control} question="What is the patient's average glucose level (mg/dL)?" register={register}/>
                <FormNumberInput name={'bmi'} control={control} question="What is the patient's BMI level?" register={register}/>
                <FormInputDropdown name={'smoking_status'} control={control} question="Is patient a smoker or has ever smoked before?" options={options_Smoking} register={register}/>
                <SubmitAndReset reset={reset}/>
                <ErrorMessage error={error}/>
                <AwaitResults waiting={query} />
            </div>
        </form>
    );

}

export default StrokePage;
