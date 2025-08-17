import React from 'react';

export const Field = ({label, children, error, htmlFor, labelClassName}) => {
  const id = htmlFor || getChildId(children);
  return (
    <div>
      {label && (
        <label htmlFor={id} className={`${labelClassName}`}>
          {label}
        </label>
      )}
      {children}
      {!!error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

const getChildId = (children) => {
   const child = React.Children.only(children);
   if("id" in child.props) {
    return child.props.id;
   }

   return null;
}
