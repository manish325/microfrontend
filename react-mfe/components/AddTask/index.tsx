import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { Formik } from "formik";
import React, { FC, useRef } from "react";
import { attachPropsAndEvents } from "../../utils/_helpers";
import { ITask } from "../../utils/types";

export interface IAddTaskProp {
    task : ITask | null
}

const AddTask : FC<IAddTaskProp> = ({task}) => {
    const addTaskComponentRef = useRef<HTMLElement | null>(null);
    const taskInitialValues : ITask = {
        name : '',
        description : '',
        id : 1,
        completed  : false
    }
    return (
        <Formik
            initialValues={task || taskInitialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
                const event = new CustomEvent('taskAdded', {
                    detail: JSON.stringify(values),
                    bubbles: true,
                    composed: true,
                });
                addTaskComponentRef.current?.dispatchEvent(event);
            }}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        maxWidth: 500,
                        margin: '0 auto',
                        padding: 4,
                        borderRadius: 2,
                        backgroundColor: '#f5f8fb',  // Subtle light gray background
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',  // Soft shadow
                        '& .MuiTextField-root': {
                            '& .MuiInputBase-input': {
                                backgroundColor: '#ffffff',  // Light background for input
                                padding: '12px',
                                borderRadius: 1,
                            },
                        },
                        '& .MuiButton-root': {
                            fontWeight: 'bold',
                            textTransform: 'none',
                            borderRadius: 2,
                        },
                    }}
                    ref={addTaskComponentRef}
                >
                    <Typography variant="h5" sx={{ color: '#4a90e2', fontWeight: 600, textAlign: 'center' }}>
                        Task Console
                    </Typography>

                    {/* Title Field */}
                    <TextField
                        label="Task Title"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        variant="outlined"
                    />

                    {/* Description Field */}
                    <TextField
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {task ? 'Update' : 'Add'} Task
                    </Button>
                </Box>
            )}
        </Formik>
    );
}

export default AddTask;