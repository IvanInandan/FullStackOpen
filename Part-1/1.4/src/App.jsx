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
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Part = (props) => { //Render parts and their exercises
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Total = (props) => { //Render total number of tasks
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  
  return (
    <div>
      <p>The total number of exercises is: {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamental of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App