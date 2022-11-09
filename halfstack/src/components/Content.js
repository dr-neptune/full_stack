import Part from './Part'

const Content = ({ parts }) => {
    const allExercises = parts.reduce((a, b) => a + b.exercises, 0)
    return (
	<div>
	    <ul>
		{parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
		<b>
		    <Part key='total' name="Total Exercises" exercises={allExercises} />
		</b>
	    </ul>
	</div>
    )
}

export default Content
