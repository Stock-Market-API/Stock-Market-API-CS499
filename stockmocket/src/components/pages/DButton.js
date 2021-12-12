import PropTypes from 'prop-types'
import "./DButton.css"

const DButton = ({color, text, onClick}) => {

    return (
    <button 
        onClick={onClick} 
        style={{backgroundColor : color}}
        className = "Dbtn"> 
        {text}
    </button>
    )

}

DButton.defaultProps = {
    color: 'silver'

}

DButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default DButton