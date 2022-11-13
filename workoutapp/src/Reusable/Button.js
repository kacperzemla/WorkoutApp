import '../Styles/functional.css';
import PropTypes from "prop-types";

export default function Button({text, className, onClick, type, disabled}){
    return <button className={className} onClick={onClick} type={type} disabled = {disabled}>{text}</button>
}

Button.defaultProps = {
    type: "submit"
};