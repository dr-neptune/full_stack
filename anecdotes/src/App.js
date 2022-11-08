import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Anecdote = ({text, votes}) => <><h3>{text}</h3><sub>This anecdote has {votes} votes.</sub></>

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
    
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    
    const newAnecdote = () => {
 	const newIndex = Math.floor(Math.random() * anecdotes.length)
 	setSelected(newIndex)
    }

    const upvote = (anecdoteIndex, val, setVal) => () => {
	const copy = [...val]
	copy[anecdoteIndex] += 1
	setVal(copy)
    }

    const arrmax = votes.reduce((idxMax, x, i, arr) => x > arr[idxMax] ? i : idxMax, 0)
    
    return (
 	<div>
	    <h2>Anecdote of the Day</h2>
 	    <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
	    <br />
	    <br />
 	    <Button handleClick={newAnecdote} text="Random Anecdote" />
	    <Button handleClick={upvote(selected, votes, setVotes)} text="Vote" />
	    <hr />
	    <h2>Anecdote with the Most Votes</h2>
	    <Anecdote text={anecdotes[arrmax]} votes={votes[arrmax]}/>
 	</div>
    )
}

export default App;
