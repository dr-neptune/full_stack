import { useState } from 'react'

const Header = props => <div><h1>{props.text}</h1></div>
const Display = props => <div>{props.text}</div>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = props => <tr><td>{props.text}</td><td></td><td></td><td>{props.value}</td></tr>

const Statistics = props => {
    if (props.total < 1) {
	return <div>No Ratings Yet</div>
    }
    return (
	<table>
	    <tbody>
	    <StatisticsLine text="Good" value={props.good} />
	    <StatisticsLine text="Neutral" value={props.neutral} />
	    <StatisticsLine text="Bad" value={props.bad} />
	    <StatisticsLine text="Total" value={props.total} />
	    <StatisticsLine text="Average" value={Math.round(((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) /
		props.total * 100) / 100} />
	    <StatisticsLine text="Positive" value={`${Math.round((props.good / props.total) * 1000) / 10} %`} />
	    </tbody>
	</table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const totalFeedback = good + neutral + bad
    
    return (
	<div>
	    <Header text="Give Feedback" />
	    <Button handleClick={() => {setGood(good + 1)}} text="good" />
	    <Button handleClick={() => {setNeutral(neutral + 1)}} text="neutral" />
	    <Button handleClick={() => {setBad(bad + 1)}} text="bad" />
	    <Header text="Statistics" />
	    <Statistics good={good} neutral={neutral} bad={bad} total={totalFeedback} />
	</div>)
}

export default App;
