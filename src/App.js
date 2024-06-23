import React from 'react'
import './App.css'
import JobApplicationForm from './components/JobApplicationForm'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster position='bottom-right' toastOptions={{duration : 3000}} />
    <JobApplicationForm />
    </>
  )
}

export default App
