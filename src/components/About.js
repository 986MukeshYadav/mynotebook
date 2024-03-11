import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
  const a= useContext(noteContext)
  return (
    <div>
      this is about {a.name}
    </div>
  )
}

export default About
