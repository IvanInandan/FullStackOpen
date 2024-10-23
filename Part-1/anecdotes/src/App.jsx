import { useState } from 'react'

const Button = ( {handleClick, text} ) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Vote = ({ score }) => <p>This quote has: { score } votes</p>

const Header = ({ text }) => <h1>{text}</h1>

const TopAnecdote = ({ anecdotes, votes }) => {
  const maxKey = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);

  if (votes[maxKey] === 0)
    return <p>waiting on votes...</p>

  return (
    <p>{anecdotes[maxKey]} has the most votes with: {votes[maxKey]}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })
   
  const [selected, setSelected] = useState(0)

  const getRandomNumber = (n) => {
    return Math.floor(Math.random() * n)
  }

  const changeQuote = () => {
    const index = getRandomNumber(anecdotes.length)
    setSelected(index)
  }

  const voteQuote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <Vote score={votes[selected]} />
      <Button handleClick={voteQuote} text="Vote" />
      <Button handleClick={changeQuote} text='Next Quote' />
      <Header text="Anecdote with the most votes" />
      <TopAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App