import Button from './Button'

const Name = (person) => {
    return (
	<tr>
	    <td>{ person.name }</td>
	    <td>{ person.number }</td>
	    <td> &nbsp;&nbsp;&nbsp;&nbsp; <Button text="💣" clickHandler={person.deletePerson(person.name)} /></td>
	</tr>
    )
}

export default Name;
