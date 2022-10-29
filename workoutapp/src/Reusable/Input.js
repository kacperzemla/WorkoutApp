import '../Styles/functional.css'

export default function Input({placeholder, onChange, value, type}){
    return <input className="form__input" placeholder={placeholder} onChange={onChange} value={value} type={type}/>
}

Input.defaultProps = {
    type: "text"
};