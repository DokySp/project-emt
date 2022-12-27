import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


const CustomDropdown = (props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-custom-components">
        검색
      </Dropdown.Toggle>
      
      <Dropdown.Menu as={
        // forwardRef again here!
        // Dropdown needs access to the DOM of the Menu to measure it
        React.forwardRef(
          ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');
        
            return (
              <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
              >
                <Form.Control
                  autoFocus
                  className="mx-3 my-2 w-auto"
                  placeholder="검색..."
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
                {/* <ul className="list-unstyled" onClick={(e) => console.log(e.target.text)}> */}
                <ul className="list-unstyled" onClick={props.onSelected}>
                  {React.Children.toArray(children).filter(
                    (child) =>
                      !value || child.props.children.toLowerCase().startsWith(value),
                  )}
                </ul>
              </div>
            );
          },
        )
      }>
        {
          props.data.map((item) => {
            return <Dropdown.Item eventKey={item.idx}  >{item.name}</Dropdown.Item>  
          })
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CustomDropdown





