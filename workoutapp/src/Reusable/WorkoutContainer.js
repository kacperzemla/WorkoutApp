import '../Styles/functional.css'

export default function WorkoutContainer({name, text, onClick, className}){
    return <div className={`container-workout ${className ? className : ""}`} onClick = {onClick}>
        <p className='container-workout__title'>{name}</p>
        <p className='conainer-workout__text'>{text}</p>
    </div>;
}