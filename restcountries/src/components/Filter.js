import TwoCol from './TwoCol'

const Filter = (props) => {
    return (<TwoCol lhs={props.title} rhs={<input value={props.term} onChange={props.termChange} />} />
    )
}

export default Filter;
