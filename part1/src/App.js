const Hello = (props) => {
    return (
	<div>
	  <p>Hello {props.name}, you are {props.age} years old</p>
	</div>
    );
};

const App = () => {
    const name = 'Bongo';
    const age = 9;

    return (
	<>
	  <h1>Greetings</h1>
	  <Hello name='Qwerty' age={5 + 3}/>
	  <Hello name={name} age={age}/>
	</>
    );
};

export default App;
