const PersonForm = (props) => {
    return(
	<form>
	    <div>
		<table>
		    <tbody>
			<tr>
			    <td>name</td><td>&nbsp;</td><td><input value={props.name} onChange={props.nameChange} /></td>
			</tr>
			<tr>
			    <td>number</td><td>&nbsp;</td><td><input value={props.number} onChange={props.numberChange} /></td>
			</tr>
		    </tbody>
		</table>
		<div>
		    <button type="submit" onClick={props.buttonClick}>add</button>
		</div>
	    </div>
	</form>
    )
}

export default PersonForm;
