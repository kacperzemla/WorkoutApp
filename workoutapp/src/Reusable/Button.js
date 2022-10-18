import '../Styles/functional.css';
import PropTypes from "prop-types";

export default function Button({text, className, onClick, type}){
    return <button className={className} onClick={onClick} type={type}>{text}</button>
}

Button.defaultProps = {
    type: "submit"
};