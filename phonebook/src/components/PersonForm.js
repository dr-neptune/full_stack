const PersonForm = (props) => {
    return(
	<form>
	    <div>
		name: <input value={props.name} onChange={props.nameChange} />
		<br />
		number: <input value={props.number} onChange={props.numberChange} />
	    </div>
	    <div>
		<button type="submit" onClick={props.buttonClick}>add</button>
	    </div>
	</form>
    )
}

export default PersonForm;
