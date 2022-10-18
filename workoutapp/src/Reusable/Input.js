import '../Styles/functional.css'

export default function Input({placeholder, onChange}){
    return <input className="form__input" placeholder={placeholder} onChange={onChange} />
}