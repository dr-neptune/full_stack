const TwoCol = (props) => {
    return (
	<table>
	    <tbody>
		<tr>
		    <td>{ props.lhs }</td>
		    <td>{ props.rhs }</td>
		</tr>
	    </tbody>
	</table>
    )
}

export default TwoCol;
