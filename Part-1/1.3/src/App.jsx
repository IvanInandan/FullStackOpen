const Header = (props) => { //Render name of the course
  return (
    <div>
    <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => { //Pass args to Part component
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </div>
  )
}

const Total = (props) => { //Render total number of tasks
  return (
    <div>
    <p>The total number of exercises is: {props.total}</p>
    </div>
  )
}

const Part = (props) => { //Render parts and their exercises
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
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
      <Content 
      part1={part1.name} exercises1={part1.exercises}
      part2={part2.name} exercises2={part2.exercises}
      part3={part3.name} exercises3={part3.exercises} 
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App