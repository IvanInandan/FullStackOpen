/*
import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>please use the app by pressing the buttons</p>
      </div>
    )
  }

  else {

    debugger

    return (
      <div>
        <p>The click tracker is: {props.allClicks.join(' ')}</p>
      </div>
    )
  }
}

const Button = ({handleClick, text}) => (
<button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      {right}
      <Button handleClick={handleRightClick} text='right'/>
      <History allClicks={allClicks} />
    </div>
  )
}

export default App
*/

import { useState } from 'react'

const Display = (props) => <p>{props.value}</p>


const App = () => {

  const [value, setValue] = useState(10)

  return (
    <div>
      <Display value={value} />
    </div>
  )
}

export default App