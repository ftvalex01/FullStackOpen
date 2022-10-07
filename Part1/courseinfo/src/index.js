import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) =>{
  return(
    <h1>{props.course}</h1>
  )

}
const Part = (props)=>{
  return(
    <p>{props.part} {props.exercices}</p>
  )
}
const Content = (props)=>{
  return(
    <div>
      <Part part={props.part1} exercices={props.exercices1}/>
      <Part part={props.part2} exercices={props.exercices2}/>
      <Part part={props.part3} exercices={props.exercices3}/>
    </div>
  )
}
const Total = (props)=>{
  console.log(props)
  return(
    <>
     {props.exercices+props.exercices2+props.exercices3}
    </>
  )
}




const App = () => {

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1.name} exercices1={part1.exercises} part2={part2.name} exercices2={part2.exercises} part3={part3.name} exercices3={part3.exercises}/>
      <Total exercices={part1.exercises} exercices2={part2.exercises} exercices3={part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))