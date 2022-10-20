import '../Styles/functional.css'

export default function Input({placeholder, onChange, value}){
    return <input className="form__input" placeholder={placeholder} onChange={onChange} value={value}/>
}