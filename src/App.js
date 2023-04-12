import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';


function App() {
  const formobj = {
    firstname: "",
    lastname: "",
    email: "",
    Dob: "",
    Rstreet1: "",
    Rstreet2: "",
    pstreet1: "",
    pstreet2: "",
    filename: "",
    typeoffile: "",
    document: ""

  }
  const [formState, setFormState] = useState(formobj)
  const [checkbox, setCheckbox] = useState(false);
  const [formerror, setFormerror] = useState({});

  function handlechange(e) {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }
  function handlecheck() {
    setCheckbox(!checkbox)
  }
  function handlesubmit(e) {
    e.preventDefault();

    const ret = validation();

    if (ret) {
      axios
        .post('https://www.postman.com/collections/b72729a9b111094c4084', formState)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })

    }
  }

  const validation = () => {

    let errorObj = {};


    if (formState.firstname === '') {
      errorObj.firstname = 'firstname is empty'
    }
    if (formState.lastname === '') {
      errorObj.lastname = 'lastname is empty'
    }
    if (formState.email === '') {
      errorObj.email = 'email is empty'
    }
    if (formState.Dob === '') {
      errorObj.Dob = 'Dob is empty'
    }
    if (formState.Rstreet1 === '') {
      errorObj.Rstreet1 = 'Rstreet1 is empty'
    }
    if (formState.Rstreet2 === '') {
      errorObj.Rstreet2 = 'Rstreet2 is empty'
    }

    if (formState.filename === '') {
      errorObj.filename = 'filename is empty'
    }
    if (formState.typeoffile === '') {
      errorObj.typeoffile = 'tyapeoffile is empty'
    }
    if (formState.document === '') {
      errorObj.document = 'document is empty'
    }





    setFormerror(errorObj);


    if (Object.keys(errorObj).length > 0) {
      return false
    }
    else {

      return true
    }

  }


  useEffect(() => {
    console.log(formState)
    console.log(checkbox)
  }, [formState, checkbox])
  return (
    <div className="App">

      <h1>REACT JS MACHINE TEST</h1>
      <div className='name'>
        <label>First Name* :
          <input type='text' placeholder='Enter your first name here' id='firstname' onChange={handlechange} required />
          {formerror.firstname}
        </label>

        <label>Last Name* :
          <input type='text' placeholder='Enter your last name here' id='lastname' onChange={handlechange} required />
          {formerror.lastname}
        </label>

      </div>
      <div className='emaildob'>
        <label>Email* :
          <input type='email' placeholder='ex: myname@example.com' id='email' onChange={handlechange} required />
          {formerror.email}
        </label>

        <label>Dob* :
          <input type='date' placeholder='Date of Birth' max='2005-04-12' id='Dob' onChange={handlechange} required />
          {formerror.Dob}
        </label>

      </div>
      <div>
        <h3>Resisdential Address</h3>
        <div className='address'>
          <label>Street* 1 :
            <input type='text' id='Rstreet1' onChange={handlechange} required />
            {formerror.Rstreet1}
          </label>

          <label>street* 2 :
            <input type='text' id='Rstreet2' onChange={handlechange} required />
            {formerror.Rstreet2}
          </label>


        </div>
        <br></br>
        <input type='checkbox' onClick={handlecheck} />Same as Resisdential Address

      </div>
      {
        !checkbox && <div>
          <h3>Permanent Address</h3>
          <div className='address'>
            <label>Street 1 :
              <input type='text' id='pstreet1' onChange={handlechange} />
            </label>
            <label>street 2 :
              <input type='text' id='pstreet2' onChange={handlechange} />
            </label>
          </div>
        </div>
      }
      <div>
        <h3>Upload Documents</h3>
        <div className='document'>
          <label>File Name* :
            <input type='text' id='filename' onChange={handlechange} required />
            {formerror.filename}
          </label>

          <label>Type Of File* :
            <select id='typeoffile' onChange={handlechange} required>Image
              <option value='png'>.png</option>
              <option value='jpg'>.jpg</option>
            </select >
            {formerror.typeoffile}
          </label>

          <label>Upload Documents* :
            <input type='file' id='document' onChange={handlechange} required />
            {formerror.document}
          </label>

        </div>
      </div><br />
      <button onClick={handlesubmit}><h2>Submit</h2></button>
    </div>
  );
}

export default App;
