import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AwaitResults, ErrorMessage, FormInputDropdown, FormNumberInput, SubmitAndReset } from './Components';

function CoronaryPage() {
    const { register, handleSubmit, control, reset } = useForm();
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
            'http://ai-doctor-3409.ap-southeast-1.elasticbeanstalk.com/predict/coronary?' + new URLSearchParams(values),
            { method: 'GET', }
        )
            .then((response)=> response.json())
            .then((result) => {
                let statement = '';
                if (result.outcome==='Absent'){
                    statement = "Patient is unlikely to have coronary artery disease"
                } else {
                    statement = "Patient is likely to have coronary artery disease"
                }
                // console.log('Success:', result.outcome);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Coronary Artery Disease', result: statement} });
            })
            .catch((error) => {
                console.error('Error:', error);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Coronary', result: "Something went wrong... Try again later"} });
            });
    }

    const options_Gender = [
        { label: "Male", value: "Male", },
        { label: "Female", value: "Female", },
    ];

    const options_ChestPainType = [
        { label: "Atypical Angina", value: "Atypical Angina", },
        { label: "Typical Angina", value: "Typical Angina", },
        { label: "Non-anginal Pain", value: "Non-anginal Pain", },
        { label: "Asymptomatic", value: "Asymptomatic", },
    ];

    const options_FastingBloodSugar = [
        { label: "Less than or equal to 120 mg/dl", value: "Less than or equal to 120 mg/dl", },
        { label: "More than 120 mg/dl", value: "More than 120 mg/dl", },
    ];

    const options_RestingECG = [
        { label: "ST-T wave abnormality", value: "ST", },
        { label: "Probable or definite left ventricular hypertrophy", value: "LVH", },
        { label: "Normal", value: "Normal", },
    ];

    const options_ExerciseInducedAngina = [
        { label: "Yes", value: "Y", },
        { label: "No", value: "N", },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="CoronaryPage" style={{height:'75vh'}}>
                <FormNumberInput name={'age'} control={control} question="What is the patient's age?" register={register}/>
                <FormInputDropdown name={'gender'} control={control} question="What is the patient's gender?" options={options_Gender} register={register}/>
                <FormInputDropdown name={'chest_pain_type'} control={control} question="What kind of chest pain does patient suffer from, if any?" options={options_ChestPainType} register={register}/>
                <FormNumberInput name={'resting_blood_pressure'} control={control} question="What is the patient's resting blood pressure (mm/Hg)?" register={register}/>
                <FormNumberInput name={'cholesterol'} control={control} question="What is the patient's average cholesterol level (mm/dL)?" register={register}/>
                <FormInputDropdown name={'fasting_blood_sugar'} control={control} question="What is the level of fasting blood sugar level of patient (mg/dl)?" options={options_FastingBloodSugar} register={register}/>
                <FormInputDropdown name={'resting_ecg'} control={control} question="What is the pattern of patient's resting ECG?" options={options_RestingECG} register={register}/>
                <FormNumberInput name={'max_hr'} control={control} question="What is the patient's maximum heart rate (bps)?" register={register}/>
                <FormInputDropdown name={'exercise_induced_angina'} control={control} question="Does patient suffer from exercise induced angina?" options={options_ExerciseInducedAngina} register={register}/>
                <SubmitAndReset reset={reset}/>
                <ErrorMessage error={error}/>
                <AwaitResults waiting={query} />
            </div>
        </form>
    );
}

export default CoronaryPage;
