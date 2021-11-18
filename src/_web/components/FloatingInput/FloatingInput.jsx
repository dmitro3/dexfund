import './FloatingInput.css';

const FloatingInput = (props) => {
    const type = props.type ? props.type : 'text';
    return (
        <label className="floating-input-wrapper" for={props.id}>
            <input type={type} className={props.className} id={props.id} value={props.value} onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeholder} />
            <span>{props.placeholder}</span>
        </label>
    )
}

export default FloatingInput;