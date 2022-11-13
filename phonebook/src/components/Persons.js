import Name from './Name'

const Persons = (props) => {
    const names = props.searchTerm === ''
		? props.persons.map(person => <Name key={person.name}
						    name={person.name}
						    number={person.number}
		                                    deletePerson={props.deletePerson} />)
		: props.persons
		       .filter(person => person.name.toLowerCase().includes(props.searchTerm.toLowerCase()))
		       .map(person => <Name key={person.name}
					    name={person.name}
					    number={person.number}
					    deletePerson={props.deletePerson} />)
    return (
	<div>
	    <br />
	    <table>
		<thead>
		    <tr>
			<th>Name</th>
			<th>Number</th>
			<th>&nbsp;</th>
		    </tr>
		</thead>
		<tbody>
		    { names }
		</tbody>
	    </table>
	</div>
    )
}

export default Persons;
