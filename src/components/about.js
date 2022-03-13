import React,{useContext,useEffect} from 'react'
import NoteContext from '../context/notecontext/NoteContext'

const About = () => {
  const a = useContext(NoteContext);

  useEffect(() => {  
      a.update();
  }, []);
  
  return (
    <div>
      This is {a.state.name} and {a.state.class}
    </div>
  )
}

export default About
