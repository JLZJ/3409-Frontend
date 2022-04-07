import React, {useState} from 'react'
import {
    FormInputDropdown,
    FormNumberInput,
    ErrorMessage,
    SubmitAndReset,
    ScaleSliderInput,
    AwaitResults
} from './Components'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

function DiabetesPage() {
    const { register, handleSubmit, control, getValues, reset } = useForm();
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
            'http://127.0.0.1:5000/predict/diabetes?' + new URLSearchParams(values),
            { method: 'GET', }
        )
            .then((response)=> response.json())
            .then((result) => {
                console.log('Success:', result.outcome);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Diabetes', result: result.outcome} });
            })
            .catch((error) => {
                console.error('Error:', error);
                changeQueryingState(false);
                navigate('/results', { state: {prevPage: 'Diabetes', result: "Something went wrong... Try again later"} });
            });
    }

    const options_Sex = [
        { label: "Male", value: "Male", },
        { label: "Female", value: "Female", },
    ];

    const options_Hypertension = [
        { label: "Present", value: "Present", },
        { label: "Absent", value: "Absent", },
    ];

    const options_HighCholesterol = [
        { label: "High", value: "High", },
        { label: "Normal", value: "Normal", },
    ];

    const options_Smoking = [
        { label: "Smokes", value: "Previously/Existing", },
        { label: "Formerly smoked", value: "Previously/Existing", },
        { label: "Never smoked", value: "Never", },
    ];

    const options_Stroke = [
        { label: "Previously", value: "Previously", },
        { label: "Never", value: "Never", },
    ];

    const options_CoronaryArteryDisease = [
        { label: "Yes", value: "Present", },
        { label: "No", value: "Absent", },
    ];

    const options_Lifestyle = [
        { label: "Active", value: "Active", },
        { label: "Normal", value: "Normal", },
    ];

    const options_FruitsConsumption = [
        { label: "Frequent", value: "Frequent", },
        { label: "Infrequent", value: "Infrequent", },
    ];

    const options_VegetableConsumption = [
        { label: "Frequent", value: "Frequent", },
        { label: "Infrequent", value: "Infrequent", },
    ];

    const options_AlcoholConsumption = [
        { label: "Frequent", value: "Frequent", },
        { label: "Infrequent", value: "Infrequent", },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="DiabetesPage" style={{height:'75vh'}}>
                <FormNumberInput name={'age'} control={control} question="What is the patient's age?" register={register}/>
                <FormInputDropdown name={'sex'} control={control} question="What is the patient's gender?" options={options_Sex} register={register}/>
                <FormNumberInput name={'income'} control={control} question="What is the patient's income?" register={register}/>
                <FormInputDropdown name={'hypertension'} control={control} question='Does patient have a history of hypertension?' options={options_Hypertension} register={register}/>
                <FormInputDropdown name={'high_cholesterol'} control={control} question='Does patient have a history of high cholesterol?' options={options_HighCholesterol} register={register}/>
                <FormNumberInput name={'bmi'} control={control} question="What is the patient's BMI level?" register={register}/>
                <FormInputDropdown name={'smoker'} control={control} question="Is patient a smoker or has ever smoked before?" options={options_Smoking} register={register}/>
                <FormInputDropdown name={'stroke'} control={control} question="Did patient suffer from stroke before?" options={options_Stroke} register={register}/>
                <FormInputDropdown name={'coronary_artery_disease'} control={control} question="Is patient diagnosed with any form of coronary artery disease?" options={options_CoronaryArteryDisease} register={register}/>
                <FormInputDropdown name={'active_lifestyle'} control={control} question="Did patient suffer from stroke before?" options={options_Lifestyle} register={register}/>
                <FormInputDropdown name={'fruits_consumption'} control={control} question="What is the level of patient's fruit consumption?" options={options_FruitsConsumption} register={register}/>
                <FormInputDropdown name={'vegetable_consumption'} control={control} question="What is the level of patient's vegetable consumption?" options={options_VegetableConsumption} register={register}/>
                <FormInputDropdown name={'alcohol_consumption'} control={control} question="What is the level of patient's alcohol consumption?" options={options_AlcoholConsumption} register={register}/>
                <ScaleSliderInput name={'general_health'} control={control} question="What is the general condition of patient's overall health?" range={5} register={register}/>
                <SubmitAndReset reset={reset}/>
                <ErrorMessage error={error}/>
                <AwaitResults waiting={query} />
            </div>
        </form>


    );

}

export default DiabetesPage;
