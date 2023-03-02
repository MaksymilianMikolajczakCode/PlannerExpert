const FormRow = ({ type, name, value, handleChange, labelText, onBlur, placeholder, maxLength }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText}
        </label>
  
        <input
          type={type}
          maxLength={maxLength}
          value={value}
          name={name}
          labelText={labelText}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={handleChange}
          className={'form-input'}
        />
      </div>
    )
  }
  
  export default FormRow