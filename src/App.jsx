import { TextField, Stack, Button } from '@mui/material'
import './App.css'
import { useState } from 'react'


function App() {

  const [interest,setInterest] = useState(0)
  const [principle,setPrinciple] = useState(0)
  const [rate,setRate] = useState(0)
  const [year,setYear] = useState(0)

  const [invalidPrinciple,setInvalidPrinciple] = useState(false)
  const [invalidRate,setInvalidRate] = useState(false)
  const [invalidYear,setInvalidYear] = useState(false)


  const validateInput = (inputTag) =>{
    const {name,value} = inputTag
    console.log(name,value);
    console.log(!!value.match(/^[0-9]*.?[0-9]+$/));
    console.log(!!value.match(/^\d*.?\d+$/));
    
    if(name=='principle'){
      setPrinciple(value)
      if(/^\d+(\.\d+)?$/.test(value)){
        setInvalidPrinciple(false)
      } else{
        setInvalidPrinciple(true)
      }       
    }else if(name=='rate'){
      setRate(value)
      if(!!value.match(/^\d+(\.\d+)?$/)){
        setInvalidRate(false)
      }else{
        setInvalidRate(true)
      }
    }else if(name=='year'){
      setYear(value)
      if(!!value.match(/^\d+(\.\d+)?$/)){
        setInvalidYear(false)
      }else{
        setInvalidYear(true)
      }
    }
  }

  const handleCalculate = (e) =>{

    e.preventDefault()
    
    if(principle && rate && year){
      setInterest((principle*rate*year)/100)
    }else{
      alert('Please fill all the fields')
    }
    
  }

  const handleReset = () =>{
    setInterest(0)
    setRate(0)
    setPrinciple(0)
    setYear(0)
    setInvalidPrinciple(false)
    setInvalidRate(false)
    setInvalidYear(false)
  }

  return (
    <>
     <div style={{width:"100%",minHeight:'100vh'}} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{width:"40%"}} className='bg-light p-5 rounded'>
        <h3>Simple Interesr Calculator</h3>
        <p>Calculate your Simple Interest Easily !</p>
        <div className='bg-warning p-5 rounded'>
          <h1>₹ {interest}</h1>
          <p className='fw-bolder'>Total Simple Interest</p>
        </div>
        <form className='mt-5'>

          <div className='mb-3'>
          <TextField value={principle || ""} name='principle' className='w-100' id="outlined-principle" label="₹ Principle Amount" variant="outlined" onChange={(e)=>validateInput(e.target)} />
          </div>
          {/* invalid principle */}
          {
            invalidPrinciple && <div style={{fontSize:'14px'}} className='text-danger fw-bolder mb-3'>
            Invalid Principle Amount
          </div>
          }

          <div className='mb-3'>
          <TextField value={rate || ""} name='rate' className='w-100' id="outlined-rate" label="% Rate" variant="outlined" onChange={(e)=>validateInput(e.target)} />
          </div>

          {
            invalidRate && <div style={{fontSize:'14px'}} className='text-danger fw-bolder mb-3'>
              Invalid Rate
            </div>
          }

          <div className='mb-3'>
          <TextField value={year || ""} name='year' className='w-100' id="outlined-year" label="Time Period (Yr)" variant="outlined" onChange={(e)=>validateInput(e.target)} />
          </div>

          {
            invalidYear && <div style={{fontSize:'14px'}} className='text-danger mb-3 fw-bolder'>
              Invalid Year
            </div>
          }

          <Stack direction="row" spacing={2}>
          <Button type='submit' onClick={handleCalculate} variant="contained" style={{width:'50%', height:'70px'}} className='bg-dark' disabled={invalidPrinciple || invalidRate || invalidYear}>Calculate</Button>
          <Button onClick={handleReset} variant="outlined" style={{width:'50%', height:'70px'}} className='border border-dark text-dark'>Reset</Button>
          </Stack>

        </form>
      </div>
     </div>
    </>
  )
}

export default App