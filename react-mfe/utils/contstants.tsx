import React, { FC, lazy } from "react";
import { ITask } from "./types";


// Lazy load your components
const Component1 = lazy(() => import("../components/component1"));
const Component2 = lazy(() => import("../components/component2"));
const Component3 = lazy(() => import("../components/component3"));
const TaskComponent = lazy(() => import("../components/Task"));
const AddTaskComponent = lazy(() => import("../components/AddTask"));

// Define a dummy Formik configuration
const dummyFormikConfig = {
  initialValues: {
    name: 'This is the Dummy Name',
    description: "This is the Dummy Description"
  }, // Empty object to be overridden
  onSubmit: () => { } // Dummy function
};

// Define your exposable components
export const exposableComponents: { name: string; component: FC<any>, props: string[] }[] = [
  {
    name: 'react-component1',
    component: Component1,
    props: ['prop1', 'prop2']
  },
  {
    name: 'react-component2',
    component: Component2,
    props: []
  },
  {
    name: 'react-tasklist',
    component: TaskComponent,
    props: ['task', 'getOnEdit', 'sampleNumber']
  },
  {
    name: 'react-component3',
    component: Component3,
    props: []
  },
  {
    name : 'react-add-task-component',
    component: AddTaskComponent,
    props : ['task']
  }
];


export const tasks : ITask[] = [
  { id : 1, name: "Buy groceries", description: "Get milk, eggs, and bread", completed : false },
  { id : 2, name: "Clean the house", description: "Dust all rooms and vacuum", completed : false }
];