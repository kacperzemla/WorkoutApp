import '../Styles/functional.css'

export default function WorkoutContainer({name, text, onClick}){
    return <div className="container-workout" onClick = {onClick}>
        <p className='container-workout__title'>{name}</p>
        <p className='conainer-workout__text'>{text}</p>
    </div>;
}