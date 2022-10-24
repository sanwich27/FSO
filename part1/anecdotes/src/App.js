import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const initVotes = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(initVotes)
  console.log(vote)

  const handleVote = () => {
    console.log("Votes of this anecdote: ", vote[selected])
    setVote(vote.slice(0, selected).concat(vote[selected] + 1).concat(vote.slice(selected+1)))
  }

  const handleNext = () => {
    const num = Math.floor(Math.random() * anecdotes.length);
    console.log("Next random number: ", num)
    setSelected(num);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p> 
      <p>has {vote[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[vote.indexOf(Math.max(...vote))]}</p>
      <p>has {Math.max(...vote)} votes</p>
    </div>
  )
}


export default App