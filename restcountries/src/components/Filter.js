const Filter = (props) => {
    return (
	<div style={{display: 'inline-flex'}}>
	    <table>
		<tbody>
		    <tr>
			<td>{props.title}</td>
			<td><input value={props.term} onChange={props.termChange} /></td>
		    </tr>
		</tbody>
	    </table>
	</div>
    )
}

export default Filter;
