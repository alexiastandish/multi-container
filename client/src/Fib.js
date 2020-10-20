import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Fib = (props) => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: '',
  })

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current')

    return setState((prevState) => ({
      ...prevState,
      values: values.data,
    }))
  }

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all')

    return setState((prevState) => ({
      ...prevState,
      seenIndexes: seenIndexes.data,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post('/api/values', {
      index: state.index,
    })

    setState((prevState) => ({
      ...prevState,
      index: '',
    }))
  }

  const renderSeenIndexes = () => {
    return state.seenIndexes.map(({ number }) => number).join(', ')
  }

  const renderValues = () => {
    const entries = []

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      )
    }
    return entries
  }

  const handleChange = (e) => {
    e.persist()
    return setState((prevState) => ({
      ...prevState,
      index: e.target.value,
    }))
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label>Enter your index: </label>
        <input value={state.index} onChange={handleChange} />
        <button>submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  )
}
export default Fib
