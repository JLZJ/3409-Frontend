import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Backdrop, Box, Button, MenuItem, Select, Slider, TextField, Typography} from "@material-ui/core";
import ReactAudioPlayer from 'react-audio-player';
import {Controller} from "react-hook-form";
import Modal from '@mui/material/Modal';
import { useSpring, animated } from 'react-spring';
import {useNavigate} from "react-router-dom";
import loading from './loading.svg'


// selection icons for survey
export const SelectSurvey =({name, imgLink, pathLink}) => {
    let navigate = useNavigate();
    const { height, width } = useWindowDimensions();
    const [bgColour, setBgColour] = useState("#f2f2f2")
    const [txtColour, setTxtColour] = useState("#f2f2f2")
    return(
        <div onClick={()=>navigate(pathLink)} style={{cursor:'pointer', width: '14vw',backgroundColor:bgColour, borderRadius: '10px', paddingTop:'10px', paddingBottom:'10px', boxShadow: '2px 3px 2px lightgrey', marginTop:'3vh', marginBottom:'2vh' }} onMouseEnter={() =>{setBgColour("#81a9e5"); setTxtColour("#f7f7fd")} } onMouseLeave={() => {setBgColour("#f2f2f2"); setTxtColour("#f2f2f2")}}>
            <img src={imgLink} onClick={()=>navigate(pathLink)} style={{width:'12vw', minHeight:'12vw',maxHeight:'13vh', borderRadius: '10px',backgroundColor:txtColour, }}/>
            {2*width>height?
                <div style={{width:'14vw', marginLeft:'4px', marginRight:'4px', height:'5vh', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                    <text style={{width:'14vw', fontSize:'100%'}}>{name}</text>
                </div>:
                <div/>}
        </div>
        )
}

// Results
export const Result =({results}) => {
    return(
        <div style={{width: '30vw', minWidth:'225px', borderRadius: '10px', paddingTop:'10px', paddingBottom:'10px', boxShadow: '2px 3px 2px lightgrey', backgroundColor:'#f2f2f2', display:'flex', justifyContent:'center' }}>
            <div style={{ marginLeft:'4px', marginRight:'4px', minHeight:'4vh', width:'17vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}} >
                <text style={{width:'15vw', marginBottom:'5px', fontWeight:'bold', textDecoration:'underline'}}>Prediction result:</text>
                <text>{" "}</text>
                <text style={{width:'15vw', marginTop:'5px'}}>{results}</text>
            </div>

        </div>
    )
}

// Additional comments from doctor
export const DoctorComments =({}) => {
    return(
        <div style={{width: '30vw', minWidth:'225px', borderRadius: '10px', paddingTop:'10px', paddingBottom:'10px', boxShadow: '2px 3px 2px lightgrey', backgroundColor:'#f2f2f2', display:'flex', justifyContent:'center', marginTop:'15px', }}>
            <div style={{ minHeight:'4vh', width:'28vw', }} >
                <TextField fullWidth multiline minRows={4} label="Additional doctor's comments" style={{width:'28vw', backgroundColor:'#f2f2f2'}}/>
            </div>

        </div>
    )
}

// Image Uploader
export const ImageUploader =({name, control, register}) => {
    const [selectedImage, setImage] = useState(null);

    const getImgURL = (img) => {
        if (img) {
            return URL.createObjectURL(selectedImage)
        } else {
            return ''
        }
    };

    return <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
            <div style={{border:'2px grey dashed', borderRadius:'10px', width: '30vw', minWidth: '225px', minHeight:'10vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Button
                    onClick={()=>document.getElementById(name).click()}
                    variant="outlined"
                    style={{marginTop:'5px',}}
                > Click to upload </Button>
                <input type='file' id={name} style={{display:'None'}} onChange={(image)=> {
                    onChange(image.target.files[0]);
                    setImage(image.target.files[0]);
                    value = image.target.files[0];
                }}
                       accept=".png,.jpg,.jpeg" />
                <img src={ getImgURL(selectedImage) } style={{maxHeight:'45vh', maxWidth:'29vw', marginTop:'5px', borderRadius:'10px',}} />
                <text style={{fontStyle:'italic', fontSize:'80%', marginTop:'5px', marginBottom:'5px'}}>*only .png, .jpg, .jpeg files are accepted</text>
            </div>
        )}
        {...register(name)}
    />
}

// Audio Uploader
export const AudioUploader =({name, control, register}) => {
    const [selectedAudio, setAudio] = useState(null);

    const getAudioURL = (img) => {
        if (img) {
            return URL.createObjectURL(selectedAudio)
        } else {
            return ''
        }
    };

    return <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
            <div style={{border:'2px grey dashed', borderRadius:'10px', width: '30vw', minWidth: '225px', minHeight:'10vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Button
                    onClick={()=>document.getElementById(name).click()}
                    variant="outlined"
                    style={{marginTop:'5px',}}
                > Click to upload </Button>
                <input type='file' id={name} style={{display:'None'}} onChange={(audio)=> {
                    if (!audio.target.files[0]) {
                        onChange(audio.target.files[0]);
                        setAudio(audio.target.files[0]);
                        value = audio.target.files[0];
                    } else if (audio.target.files[0].size<200000) {
                        alert('File should be longer than 5 seconds, please upload another file.')
                        return
                    } else if (audio.target.files[0].size>1500000) {
                        alert('File should not be longer than 30 seconds, please upload another file.')
                        return
                    } else {
                        onChange(audio.target.files[0]);
                        setAudio(audio.target.files[0]);
                        value = audio.target.files[0];
                    }
                }}
                       accept=".wav" />
                <ReactAudioPlayer
                    src={ getAudioURL(selectedAudio) }
                    autoPlay ={false}
                    controls
                    style={{maxHeight:'45vh', maxWidth:'29vw', marginTop:'5px'}}
                />
                <text style={{fontStyle:'italic', fontSize:'80%', marginTop:'5px', marginBottom:'5px'}}>*only .wav files are accepted</text>
            </div>
        )}
        {...register(name)}
    />
}

// Form Dropdown Input
export const FormInputDropdown= ({name, question, options, control, register}) => {
    const generateSelectOptions = () => {
        return options.map((option) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };

    return <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
            <div style={{width:'30vw', flexDirection: 'column', display:'flex' }}>
                <a style={{width:'30vw', marginBottom:'12px', marginTop:'20px', textAlign:'left'}}>{question}</a>
                <Select onChange={onChange} value={value} style={{marginBottom:'10px'}} >
                    {generateSelectOptions()}
                </Select>
            </div>
        )}
        {...register(name)}
    />
};

// Numeric Input
export const FormNumberInput = ({name, question, control, register}) => {
    return <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field: { onChange, value } }) => (
            <div style={{width:'30vw', flexDirection: 'column', display:'flex'}}>
                <a style={{width:'30vw', marginBottom:'12px', marginTop:'20px', textAlign:'left'}}>{question}</a>
                <TextField onChange={onChange} value={value} id="number-input"  label="Value" type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} style={{marginBottom:'10px'}}/>
            </div>
        )}
        {...register(name)}
    />
};

// Numeric Input
export const ScaleSliderInput = ({name, question, control, range, register}) => {
    return <Controller
        name={name}
        control={control}
        defaultValue={'Unselected'}
        render={({ field: { onChange, value } }) => (
            <div style={{width:'30vw', flexDirection: 'column', display:'flex'}}>
                <a style={{width:'30vw', marginBottom:'12px', marginTop:'20px', textAlign:'left'}}>{question}</a>
                <Slider
                    aria-label="Always visible"
                    axis={'x'}
                    defaultValue={'Unselected'}
                    valueLabelFormat={(x)=>{
                        if (Number.isInteger(x)){
                            return x
                        } else {
                            return 1
                        }
                    }}
                    step={1}
                    min = {1}
                    max={range}
                    onChange={(x,y)=> onChange(y)}
                    valueLabelDisplay="auto"
                    style={{marginBottom:'10px', width:'25vw', alignSelf:'center', marginTop:'35px'}}/>
                <text>{value}</text>
            </div>
        )}
        {...register(name)}
    />
};

// Submit and Reset Button
export const SubmitAndReset = (reset) => {
    return (
        <div style={{width:'30vw', display: 'flex', justifyContent:'space-between', margin:'10px 0px', padding:'3px 0px 25px 0px'}}>
            <Button onClick={()=>console.log('Submit')} variant={"contained"} type="submit">
                {" "}Submit{" "}
            </Button>
            <Button onClick={()=>reset.reset()} variant={"outlined"}>
                {" "}Reset{" "}
            </Button>
        </div>
    );
};

export const Submit = () => {
    return (
        <div style={{width:'30vw', display: 'flex', justifyContent:'center', margin:'10px 0px', padding:'3px 0px 25px 0px'}}>
            <Button onClick={()=>console.log('Submit')} variant={"contained"} type="submit">
                {" "}Submit{" "}
            </Button>
        </div>
    );
};

// Pop-up for error
const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export const ErrorMessage = (error) =>  {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=> {
        if (error.error){
            handleOpen()
        }
    },[error])

    return (
        <div >
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, }}
            >
                <Fade in={open} >
                    <Box style={{
                        padding: '25px',
                        backgroundColor: '#eeeeee',
                        width: "45vw",
                        height: "10vh",
                        border: '2px solid #000',
                        boxShadow: "24",
                        p: "4",
                        borderRadius: "10px",
                        position: 'absolute',
                        left: '0',
                        right: '0',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        top: '45vh',
                        bottom: '45vh',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        textAlign: "center", alignItems:'center', justifyContent:'center',
                        display:'flex'
                    }}>
                        <Typography id="spring-modal-title" variant="h6" component="h2" >
                            Kindly fill up all required fields before proceeding
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export const AwaitResults = (waiting) =>  {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=> {
        if (waiting.waiting){
            handleOpen()
        }
    },[waiting])
    useEffect(()=> {
        if (!waiting.waiting){
            handleClose()
        }
    },[waiting])
    const doNothing = () => null;

    return (
        <div >
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, onClick: doNothing()}}

            >
                <Fade in={open} >
                    <img src={loading} alt="loading..." style={{
                        position: 'absolute',
                        left: '0',
                        right: '0',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        top: '45vh',
                        bottom: '45vh',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        textAlign: "center", alignItems:'center', justifyContent:'center',
                        display:'flex'}}/>
                </Fade>
            </Modal>
        </div>
    );
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
