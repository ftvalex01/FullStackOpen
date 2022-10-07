export const Total = ({parts})=>{
    const totalExercices = parts.reduce((prevValue,part) => prevValue + part.exercises,0)
  
    return(
      <p><strong>Number of exercises:{totalExercices}</strong> </p>
    )
  }
  