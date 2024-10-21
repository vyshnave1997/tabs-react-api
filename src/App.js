import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://jsonplaceholder.typicode.com/users'
function App() {

  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)
  const [error, setError] = useState(null)

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error (`Error: ${response.status} ${response.statusText}`)
      }
      const newJobs = await response.json()
      setJobs(newJobs)
    }
    catch (err) {
      setError(err.message)
    }finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className='section loading'>
        <h1>Loading ...</h1>
      </section>
    )
  }

  if (error) {
    return (
      <section className='section error'>
        <h1>{error}</h1>
      </section>
    )
  }

  if (!jobs.length) {
    return (
      <section className='section no-data'>
        <h1> no jobs available</h1>
      </section>
    )
  }
  const { name, username, email, phone } = jobs[value]
  return (
    <section className='section'>
      <div className='title'>
        <h2>Users</h2>
        <div className='underline'></div>
        
      </div>
      <div className='job-center'>
        <div className='btn-container'>
          {jobs.map((item, index) => {
            return (
              <button key={item.id}
              onClick={() => setValue(index)}
              className={`job-btn ${index === value && 'active-btn'}`}
              >
                {item.name}
              </button>
            )
          })}
        </div>
        <article className='job-info'>
          <h3>{name}</h3>
          <h4>{username}</h4>
          <p className='job-date'>{email}</p>
          <p>{phone}</p>
        </article>
      </div>
      <button type='button' className='btn'>more info</button>
    </section>
  );
}

export default App
