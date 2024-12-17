import React from 'react'
import ReactDOM from 'react-dom'

const ReactComponentOne:React.FC = () => {
    return (
        <p>
          React Component 1
        </p>
    )
}

export default ReactComponentOne;

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<ReactComponentOne/>, this);
  }
}

customElements.define('react-component-1', ReactMfe);