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
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course}/>
      <Content 
      part1={part1} exercises1={exercises1}
      part2={part2} exercises2={exercises2}
      part3={part3} exercises3={exercises3} 
      />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App