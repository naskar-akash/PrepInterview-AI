import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { HiOutlineDocumentArrowUp, HiOutlineCheckCircle, HiOutlineTrash } from 'react-icons/hi2'
import { motion } from 'motion/react'
import { uploadResume } from '../services/resumeServices'

const Dashboard = () => {
  const [resumes, setResumes] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    resumeTitle: '',
    targetJobTitle: '',
    skillsFocus: ''
  })

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file) => {
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed')
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return false
    }
    return true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError('')

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
      }
    }
  }

  const handleChange = (e) => {
    setError('')
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        setSelectedFile(file)
      }
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addResume = (e) => {
    e.preventDefault()
    setError('')

    if (!selectedFile) {
      setError('Please select a file')
      return
    }

    if (!formData.resumeTitle.trim()) {
      setError('Resume title is required')
      return
    }

    if (!formData.targetJobTitle.trim()) {
      setError('Target job title is required')
      return
    }

    const newResume = {
      id: Date.now(),
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(2),
      uploadedAt: new Date().toLocaleDateString(),
      file: selectedFile,
      resumeTitle: formData.resumeTitle,
      targetJobTitle: formData.targetJobTitle,
      targetCompany: formData.targetCompany,
      skillsFocus: formData.skillsFocus
    }
    setResumes([...resumes, newResume])
    

    resetForm()
  }

  const resetForm = () => {
    setSelectedFile(null)
    setFormData({
      resumeTitle: '',
      targetJobTitle: '',
      targetCompany: '',
      skillsFocus: ''
    })
    document.getElementById('file-upload').value = ''
  }

  const deleteResume = (id) => {
    setResumes(resumes.filter(resume => resume.id !== id))
  }

  return (
    <div className='min-h-screen bg-slate-100'>
      <Navbar />
      
      <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <h1 className='text-4xl font-bold text-slate-900'>Resume Dashboard</h1>
          <p className='mt-2 text-slate-600'>Upload and manage your resume files for interview preparation</p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mb-8 rounded-3xl bg-white p-8 shadow-lg shadow-slate-200'
        >
          <h2 className='mb-6 text-2xl font-bold text-slate-900'>Upload New Resume</h2>
          
          <form onSubmit={addResume} className='space-y-5'>
            {/* Resume Title */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Resume Title *</label>
              <input
                type='text'
                name='resumeTitle'
                value={formData.resumeTitle}
                onChange={handleFormChange}
                placeholder='e.g., Senior Developer Resume'
                className='w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100'
              />
            </div>

            {/* Target Job Title */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Target Job Title *</label>
              <input
                type='text'
                name='targetJobTitle'
                value={formData.targetJobTitle}
                onChange={handleFormChange}
                placeholder='e.g., Full Stack Developer'
                className='w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100'
              />
            </div>

            {/* Skills Focus */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Skills to Focus On (Optional)</label>
              <textarea
                name='skillsFocus'
                value={formData.skillsFocus}
                onChange={handleFormChange}
                placeholder='e.g., React, Node.js, Database Design'
                rows='3'
                className='w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100'
              />
            </div>

            {/* File Upload */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Resume File (PDF) *</label>
              <motion.div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-300 bg-slate-50 hover:border-slate-400'
                }`}
              >
                <div className='flex flex-col items-center justify-center'>
                  <HiOutlineDocumentArrowUp className='h-8 w-8 text-indigo-600 mb-2' />
                  <p className='text-sm text-slate-600'>
                    {selectedFile ? selectedFile.name : 'Drag PDF here or click to select'}
                  </p>
                  <input
                    type='file'
                    accept='.pdf'
                    onChange={handleChange}
                    className='hidden'
                    id='file-upload'
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='mt-3 rounded-full bg-indigo-600 px-4 py-2 text-sm text-white font-medium transition hover:bg-indigo-700 cursor-pointer'
                    onClick={() => document.getElementById('file-upload').click()}
                    type='button'
                  >
                    Choose File
                  </motion.button>
                  <p className='mt-2 text-xs text-slate-500'>PDF only • Maximum 5MB</p>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <div className='flex gap-3'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                className='flex-1 rounded-2xl bg-indigo-600 px-6 py-3 text-white font-semibold transition hover:bg-indigo-700'
              >
                Upload Resume
              </motion.button>
              {selectedFile && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='button'
                  onClick={resetForm}
                  className='rounded-2xl bg-slate-300 px-6 py-3 text-slate-800 font-semibold transition hover:bg-slate-400'
                >
                  Clear
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700'
          >
            {error}
          </motion.div>
        )}

        {/* Uploaded Resumes */}
        {resumes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className='mb-4 text-lg font-semibold text-slate-900'>Your Resumes ({resumes.length})</h3>
            <div className='space-y-3'>
              {resumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className='rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-4 flex-1'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 mt-1'>
                        <span className='text-red-600 font-bold text-sm'>PDF</span>
                      </div>
                      <div className='flex-1'>
                        <p className='font-semibold text-slate-900'>{resume.resumeTitle}</p>
                        <p className='text-sm text-slate-600 mt-1'>Target: <span className='font-medium'>{resume.targetJobTitle}</span></p>
                        {resume.targetCompany && (
                          <p className='text-sm text-slate-600'>Company: <span className='font-medium'>{resume.targetCompany}</span></p>
                        )}
                        <p className='text-xs text-slate-500 mt-2'>{resume.name} • {resume.size} KB • {resume.uploadedAt}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteResume(resume.id)}
                      className='rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100'
                      title='Delete resume'
                    >
                      <HiOutlineTrash className='h-5 w-5' />
                    </motion.button>
                  </div>
                  {resume.skillsFocus && (
                    <div className='mt-3 rounded-lg bg-slate-50 p-3'>
                      <p className='text-xs font-medium text-slate-700 mb-1'>Skills Focus:</p>
                      <p className='text-sm text-slate-600'>{resume.skillsFocus}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {resumes.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center'
          >
            <p className='text-slate-600'>No resumes uploaded yet. Upload your first resume to get started!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
