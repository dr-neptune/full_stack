const Header = (props) => {
    return (
	<>
	    <h1>{props.course}</h1>
	</>
    )
}

const Part = (props) => {
    return (
	<>
	    <p>{props.part.name}: {props.part.exercises}</p>
	</>
    )
}

const Content = (props) => {
    return (
	props.parts.map(item => <Part key={item.id} part={item} />)
    )
}

const Total = (props) => {
    const overall = props.parts.reduce((a, b) => a + b.exercises, 0)
    return (
	<>
	    <p>Number of exercises: {overall}</p>
	</>
    )
}

const App = () => {
    const course = {
	name: 'Half Stack Application Development',
	parts: [
	    {
		name: 'Fundamentals of React',
		exercises: 10,
		id: 1
	    },
	    {
		name: 'Using props to pass data',
		exercises: 7,
		id: 2
	    },
	    {
		name: 'State of a component',
		exercises: 14,
		id: 3
	    }
	]
    }

    const arto = {
	name: 'Arto Hellas',
	age: 35,
	education: 'PhD',
	greet: function() {    console.log('hello, my name is ' + this.name)  },}

    arto.greet()

    return (
	<div>
	    <Header course={course.name} />
	    <Content parts={course.parts} />
	    <Total parts={course.parts} />
	</div>
    )
}

export default App;
