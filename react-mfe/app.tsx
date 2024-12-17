import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Routes, HashRouter } from 'react-router-dom';
import ReactComponentTwo from './reactComponentTwo';
import ReactComponentOne from './reactComponentOne';
import { useGlobalStore } from './hooks/useGlobalStore';
import { Button, TextField } from '@mui/material';
import "./app.scss";
import { attachPropsAndEvents } from './utils/_helpers';
import Task from './components/Task';
import StaticContent from './components/StaticContent';
import { tasks } from './utils/contstants';
import { ITask } from './utils/types';

const App = () => {
  // const reactVersion = require('./package.json').dependencies['react'];
  const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
  const [state, setState] = useState<any>(null);
  const { store, actions } = useGlobalStore();
  const [customState, setCustomState] = useState<string | null>(null);
  const [headerContent, setHeaderContent] = useState<string>('This Is Initial Header Content!');
  const headerElementRef = useRef<any>(null);
  const [tasksToRender, setTasksToRender] = useState<ITask[]>(tasks);


  const onCustomButtonClicked = (data: string) => {
    console.log(`The Data Recieved is ${data} `);
    setHeaderContent(data);
  }

  const propsMap = {
    headerContent: headerContent
  }

  const eventsMap = {
    buttonClicked: onCustomButtonClicked
  }

  const setUser = (name: string) => {
    if (store && actions)
      store?.dispatch(actions?.setUser(name))
  }

  // useEffect(() => {
  //   const worker = new SharedWorker('http://localhost:4200/assets/workers/sharedWorker.js');
  //   worker.port.postMessage({ type: 'getState' });
  //   worker.port.onmessage = (event) => {
  //     if (event.data.type === 'stateUpdate') {
  //       console.log('Updated State:', event.data.state);
  //       setState(event?.data?.state || null);
  //     }
  //   };
  //   // Send a message to update the state
  //   const updateState = (newState: any) => {
  //     worker.port.postMessage({ type: 'setState', payload: newState });
  //   };
  //   // Start the port communication
  //   worker.port.start();
  // }, [
  //   setState
  // ])

  useEffect(() => {
    if (store) {
      setState(store?.getState());
      console.log("Initital State Captured At React Is : ", store.getState());
      store?.subscribe(() => {
        console.log('State Updated From React MFE', store?.getState());
        setState(store?.getState);
      });
    }
  }, [store]);
  
  return (
    <StaticContent></StaticContent>
  )
  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h1>Welcome to Task Management</h1>
        <Button onClick={() => {
          setTasksToRender([...tasksToRender, { id: 3, name: 'New Task', description: 'New Task Description', completed: false }])
        }}>
          Add Task
        </Button>
      </header>
      <ul>
        {
          tasksToRender.map((task: ITask) => {
            return  (
                <li>
                  <Task task={task}></Task>
                </li>
            )
          })
        }
      </ul>
    </>
  )


  return (
    // <Custom name='header'></Custom>
    <main className="react-container">
      <h1>This is a react application</h1>
      <h2>Set The Global State Here</h2>
      {/* <Task task={{
        name : 'This is Task',
        description : 'This is Description',
        sampleNumber : 123
      }} edit={() => alert('This is On Edit')} /> */}
      <TextField
        placeholder='Enter The State Here!'
        onChange={(event: any) => setCustomState(event.target.value)}
        value={customState}
      // value={store?.getState()}
      />
      <Button variant='contained' onClick={() => setUser(customState || '')}>Set State</Button>
      <app-header ref={attachPropsAndEvents({ props: propsMap, events: eventsMap })}></app-header>
      <react-component1 prop1={'This is a prop from react app'}></react-component1>
    </main>
  )

  return (
    <HashRouter basename='/react'>
      <div>
        <h1>Application state is</h1>
        {/* <Custom name='header'></Custom> */}
        {/* {
          state ? <h3>{getStateVal()}</h3> : 'Loading the application state....'
        } */}
        {/* <h3>{state?.state || "Loading..."}</h3> */}
        <h1>
          <img style={{ marginRight: "10px" }} src={logoUrl} height="30" alt="React Logo" />
          React MFE
        </h1>
        {/* <p>React Version: {reactVersion}</p> */}

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ReactComponentOne />} />
          <Route path="/about" element={<ReactComponentTwo />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App />, this);
  }
}

customElements.define('react-element', ReactMfe);