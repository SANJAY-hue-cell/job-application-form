import React, {  useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import {TimePicker} from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {toast} from 'react-hot-toast'


function JobApplicationForm() {
  const [fullName , setFullName ] = useState('');
  const [email , setEmail ] = useState('');
  const [phoneno , setPhoneno ] = useState('');
  const [applyForPosition , setApplyForPosition] = useState('');
  const [preferredInterviewDate , setPreferredInterviewDate] = useState(new Date());
  const [preferredInterviewTime , setPreferredInterviewTime ] = useState('10:00');
  const [selectedAdditionalSkills , setSelectedAdditionalSkills ] = useState([]);
  const [relevantExperience , setRelevantExperience ] = useState('');
  const [portfolioUrl , setPortfolioUrl ] = useState('');
  const [managementExperience , setManagementExperience ] = useState('');
  const [submitted , setSubmitted ] = useState(false);
  const [errors , setErrors ] = useState({});
  const [submittedData , setSubmittedData ] = useState({});
  const [displaydata , setDisplayData ] = useState('');

  const positions = [
    { value : 'developer' , label : 'Developer'},
    { value : 'designer' , label : 'Designer'},
    { value : 'manager' , label : 'Manager'}
  ]

  const additionalSkills = [
    {value : 'javascript' , label : 'JavaScript'},
    {value : 'css' , label : 'CSS'},
    {value : 'python' , label : 'Python'},
    {value : 'html' , label : 'HTML'},
    {value : 'reactjs' , label : 'React Js'},
    {value : 'mongodb' , label : 'MongoDB'},
    {value : 'angular'  , label : 'Angular'}
  ]



 const handlePositionChange = (e) => {
  setApplyForPosition(e.target.value);
 }

 const handleAdditionalSkillChange = (e) => {
  const { value, checked } = e.target;
    if (checked) {
      setSelectedAdditionalSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSelectedAdditionalSkills((prevSkills) =>
        prevSkills.filter((skill) => skill !== value)
      );
    }
};



let activeToast = false ;

const validateForm = () => {
  const errors = {};
  //check full name
  if(!fullName){
    errors.fullName = 'Name is required'
    if(!activeToast){
      toast.error('Full Name is required')
      activeToast = true ;
    }
  }

  //check email 
  if(!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
    errors.email = 'Email is Required';
    if(!activeToast){
      toast.error('Email is required and should be valid');
      activeToast = true ;
    }
  }

  //check phone no.
  if(!phoneno || phoneno.length<10 || phoneno.length>10){
    errors.phoneno = ' Phone No. is required and should be valid ';
    if(!activeToast){
      toast.error('Phone Number is required and should be valid');
      activeToast = true ;
    }
  }

  //check for relevant experiece
  if(applyForPosition === 'developer' || applyForPosition === 'designer'){
    if(!relevantExperience || relevantExperience === 0){
      errors.relevantExperience = 'Enter your experience in years greater than 0'
      if(!activeToast){
        toast.error('Enter your experience in years greater than 0');
        activeToast = true ;
      }
    }
  }

  //check apply for position 
  if(!applyForPosition){
    errors.applyForPosition = 'Select a position to apply'
    if(!activeToast){
      toast.error('Select a position to apply');
      activeToast = true ;
    }
  }

  //check for portfolio url
  if(applyForPosition === 'designer'){
    if(!portfolioUrl){
      errors.portfolioUrl = 'Provide your portfolio Url and is required'
      if(!activeToast){
        toast.error('Provide your portfolio Url and iis required');
        activeToast = true ;
      }
    }
  }

  //check for management experience
  if(applyForPosition ==='manager'){
    if(!managementExperience){
      errors.managementExperience  = 'Management experience is required for this role'
      if(!activeToast){
        toast.error('Management experience is required for this role');
        activeToast = true ;
      }
    }
  }

  //check if atleast one checkbox is checked
  if(!selectedAdditionalSkills || selectedAdditionalSkills <= 0){
    errors.selectedAdditionalSkills = 'Atleast One skill is required'
    if(!activeToast){
      toast.error('Atleast One skill is required');
      activeToast = true ;
    }
  }  

  //validate time and date for interview

  if(!preferredInterviewDate ){
    errors.preferredInterviewDate = 'Please select a Date ';
    if(!activeToast){
      toast.error('Enter a date your comfortable and able to attend the interview')
      activeToast = true ;
    }
  }

  if(!preferredInterviewTime){
    errors.preferredInterviewTime = 'Select a time';
    if(!activeToast){
      toast.error('Enter a Time for your interview') ;
      activeToast =  true ;
    }
  }

  return errors ;
}

const resetCheckboxes = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      });
}

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm();
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setSubmitted(true);
      setSubmittedData({
        fullName,
        email,
        phoneno,
        applyForPosition,
        relevantExperience,
        portfolioUrl,
        managementExperience,
        selectedAdditionalSkills : selectedAdditionalSkills.join(' , '),
        preferredInterviewDate ,
        preferredInterviewTime
      });
      setFullName('');
      setEmail('');
      setPhoneno('');
      setApplyForPosition('');
      setRelevantExperience('');
      setPortfolioUrl('');
      setManagementExperience('');
      setSelectedAdditionalSkills([]);
      setPreferredInterviewDate(new Date());
      setPreferredInterviewTime('10:00');
      resetCheckboxes();
      e.target.reset();
      toast.success('Form Submitted successfully');
    }
}

useEffect(() => {
  if (submitted) {
    setDisplayData(submittedData);
    const timer = setTimeout(() => {
      setSubmitted(false);
      setDisplayData({});
    }, 30000); // 30 Seconds 
    return () => {
      clearTimeout(timer);
    }
    
  }
}, [submitted, submittedData]);

  return (
    <div className="container pt-4">
      <div className="row  justify-content-center ">
        <form 
        onSubmit={handleSubmit}
        className="form col-12 col-md-7 col-lg-5 d-flex flex-column gap-3 border border-3 rounded border-primary py-3">

          <h2 className="text-center">
            <span className='fw-bold bg-body-tertiary '>
              Job Application Form
            </span>
          </h2>

          <div className="d-flex flex-column gap-1 align-items-center">
            <label className='fw-bold'>Full Name</label>
            <input 
            type="text"
            className='w-75 border border-2 border-primary rounded px-3' 
            style={{height:'2.5rem'}}
            placeholder='e.g.,John Doe'
            value={fullName}
            onChange={(e)=>setFullName( e.target.value)}
            />
             {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}
          </div>

          <div className="d-flex flex-column gap-1 align-items-center">
            <label  className='fw-bold'>Email</label>
            <input 
            type="email"
            className='w-75 border border-2 border-primary rounded px-3' 
            style={{height:'2.5rem'}}
            placeholder='e.g.,abc@gmail.com'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="d-flex flex-column gap-1 align-items-center">
            <label  className='fw-bold'>Phone number</label>
            <input 
            type="number"
            className='w-75 border border-2 border-primary rounded px-3' 
            style={{height:'2.5rem'}}
            placeholder='e.g.,98xxxxxx32'
            value={phoneno}
            onChange={(e)=> setPhoneno( e.target.value)}
            />
          </div>

          <div className="d-flex flex-column gap-1 align-items-center">
            <label className='mb-1 fw-bold'>Applying for position</label>
            <select 
            name="" 
            id="" 
            className='text-center'
            onChange={handlePositionChange}
            >
              <option value="">Select a option</option>
              {positions.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
          </div>

          <div >

          {applyForPosition === 'developer' || applyForPosition === 'designer'? (
              <div className='d-flex flex-column gap-1 align-items-center '>
                <label className='fw-bold'>Relevant Experience</label>
                <input
                 type='number' 
                 min='1' 
                 value={relevantExperience}
                 onChange={(e)=>setRelevantExperience(e.target.value)}
                 />
              </div>
          ):null}

          {applyForPosition === 'designer'? (
            <div className='d-flex flex-column gap-1 align-items-center mt-1'>
              <label className='fw-bold'>Portfolio URL</label>
              <input
               type='url' 
               value={portfolioUrl}
               onChange={(e)=>setPortfolioUrl(e.target.value)}
                />
            </div>
          ):null}

          {applyForPosition === 'manager'? (
            <div className='d-flex flex-column gap-1 align-items-center'>
              <label  className='fw-bold'>Management Experience</label>
              <textarea 
              rows={4} 
              cols={40} 
              placeholder='Management experience ...'
              value={managementExperience}
              onChange={(e)=>setManagementExperience(e.target.value)}
              >
              </textarea>
            </div>
          ):null}

          </div>

          <div className="d-flex flex-column gap-1 align-items-center">
            <label className='fw-bold'>Additional Skills</label>
            <div className="text-start">
            {additionalSkills.map((skill) => (
              <div key={skill.value} className="d-flex gap-1 justify-content-start align-items-center">
                <input
                  type="checkbox"
                  value={skill.value}
                  onChange={handleAdditionalSkillChange}
                />
                <label>{skill.label}</label>
              </div>
            ))}
            </div>
            
          </div>

          <div className="d-flex flex-column gap-1 align-items-center">
            <label className='fw-bold'>Preferred Interview Time</label>
            <div className="d-flex flex-column flex-sm-row gap-2">
            <div className="d-flex flex-column">
            <label  className='fw-bold'>Pick A Date</label>
            <DatePicker
            selected={preferredInterviewDate}
            onChange={(date)=>setPreferredInterviewDate(date)}
            placeholder = 'Pick a Date'
             className=""
            />
            </div>
            <div className="d-flex flex-column">
            <label className='fw-bold'>Pick A Time</label>
            <TimePicker
            value={preferredInterviewTime}
            onChange={(time)=>setPreferredInterviewTime(time)} 
             className=""
            />
            </div>
            </div>
          </div>

          <div className="text-center">
            <button className='border border-2 rounded btn  btn-primary' type='submit'>
              Submit
            </button>
          </div>
        </form>
        <div className="text-start mt-4">
          {submitted &&  (
            <div className=' border border-3 rounded border-dark p-3'>
              <h5 className='fw-bold text-success'>
                Your response has been recorded !
              </h5>
              <p className='fw-bold text-primary'>
                A copy of the data is collected , if you require make a note of the informations provided .
              </p>
              <p className='text-warning fw-bold'>
                The data will disappear from your screen in some  seconds.
              </p>
              <ul style={{listStyleType:'none'}}>
                <li>
                  <span className='fw-bold'>
                    Full Name :
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.fullName}
                  </span>
                </li>
                <li>
                  <span className='fw-bold'>
                    Email :
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.email}
                  </span>
                </li>
                <li>
                  <span className='fw-bold'>
                    Phone No :
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.phoneno}
                  </span>
                </li>
                <li>
                  {submittedData.applyForPosition === 'developer' || submittedData.applyForPosition === 'designer'? (
                    <div>
                      <span className='fw-bold'>
                        Relevant Experience :
                      </span>
                      <span> </span>
                      <span>
                        {submittedData.relevantExperience} years
                      </span>
                    </div>
                  ):null}
                </li>
                <li>
                  {submittedData.applyForPosition === 'designer'? (
                    <div>
                      <span className='fw-bold'>
                        Portfolio Url:
                      </span>
                      <span> </span>
                      <span>
                        {submittedData.portfolioUrl} 
                      </span>
                    </div>
                  ):null}
                </li>
                <li>
                  {submittedData.applyForPosition === 'manager'? (
                    <div>
                      <span className='fw-bold'>
                        Management Experience :
                      </span>
                      <span> </span>
                      <span>
                        {submittedData.managementExperience} years
                      </span>
                    </div>
                  ):null}
                </li>
                <li>
                  <span className='fw-bold'>
                    Additional skills :
                  </span>
                  <span> </span>
                  <span>
                  {submittedData.selectedAdditionalSkills}
                  </span>
                </li>
                <li>
                  <span className='fw-bold'>
                    Preferred Interview Date :
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.preferredInterviewDate.toLocaleDateString()}
                  </span>
                </li>
                <li>
                  <span className='fw-bold'>
                    Preferred Interview Time :
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.preferredInterviewTime}
                  </span>
                </li>

              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobApplicationForm