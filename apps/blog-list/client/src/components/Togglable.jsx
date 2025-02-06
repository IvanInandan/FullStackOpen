import PropTypes from "prop-types";

import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" }; // Sets 'display' CSS in-line style to 'none' when visible === true (hides)
  const showWhenVisible = { display: visible ? "" : "none" }; // In-line CSS style to show when visible === true

  const toggleVisibility = () => {
    // Function that inverses visible state
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    // Returns defined 'toggleVisibility' function so App.jsx can call this function outside of this component
    return {
      toggleVisibility,
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
