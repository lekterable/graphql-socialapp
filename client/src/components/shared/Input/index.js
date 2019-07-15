import React from 'react'

export default ({
  field: { name, value, onChange },
  className,
  placeholder,
  type = 'text'
}) => (
  <input
    id={name}
    className={className}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
  />
)
