import React, { FC, useRef, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    IconButton,
    Typography,
} from "@mui/material";
import { ITask } from "../../utils/types";

export interface ITaskProps {
    task: ITask;
}

const Task: FC<ITaskProps> = ({ task }) => {
    const taskComponentRef = useRef<HTMLElement | null>(null);
    const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

    const toggleTask = (updatedTask: ITask) => {
        updatedTask = {
            ...updatedTask,
            completed: !updatedTask.completed,
        };
        const event = new CustomEvent("taskEdited", {
            detail: JSON.stringify(updatedTask),
            bubbles: true,
            composed: true,
        });
        taskComponentRef.current?.dispatchEvent(event);
    };

    const toggleExpand = (id: number) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };

    const openEditDialog = (task: ITask) => {
        const event = new CustomEvent("openTaskToEdit", {
            detail: JSON.stringify(task),
            bubbles: true,
            composed: true,
        });
        taskComponentRef.current?.dispatchEvent(event);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
            }}
            ref={taskComponentRef}
        >
            <Card
                sx={{
                    width: "100%",
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    bgcolor: task.completed ? "action.selected" : "background.paper",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                    },
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {/* Task Completion Toggle */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton
                                onClick={() => toggleTask(task)}
                                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                                sx={{
                                    color: task.completed ? "primary.main" : "text.secondary",
                                    border: "1px solid",
                                    borderColor: task.completed ? "primary.main" : "divider",
                                    borderRadius: "50%",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        bgcolor: task.completed ? "primary.light" : "action.hover",
                                    },
                                }}
                            >
                                {task.completed ? "✓" : "○"}
                            </IconButton>
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{
                                    fontWeight: "bold",
                                    textDecoration: task.completed ? "line-through" : "none",
                                    color: task.completed ? "text.disabled" : "text.primary",
                                }}
                            >
                                {task.name}
                            </Typography>
                        </Box>

                        {/* Expand/Collapse Toggle */}
                        <IconButton
                            onClick={() => toggleExpand(task.id)}
                            aria-label={expandedTaskId === task.id ? "Hide details" : "View details"}
                            sx={{
                                transform: expandedTaskId === task.id ? "rotate(180deg)" : "rotate(0)",
                                transition: "transform 0.3s",
                            }}
                        >
                            {expandedTaskId === task.id ? "▲" : "▼"}
                        </IconButton>
                    </Box>

                    {/* Task Description Collapse */}
                    <Collapse in={expandedTaskId === task.id}>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                {task.description}
                            </Typography>
                        </Box>
                    </Collapse>
                </CardContent>

                {/* Card Actions (Edit Button) */}
                {expandedTaskId === task.id && (
                    <CardActions
                        sx={{
                            justifyContent: "flex-end",
                            px: 2,
                            py: 1,
                            borderTop: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => openEditDialog(task)}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                backgroundColor: "#2d8cf0", // Using your primary color
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#226bbd", // Slightly darker shade for hover effect
                                },
                            }}
                        >
                            Edit Task
                        </Button>
                    </CardActions>
                )}
            </Card>
        </Box>
    );
};

export default Task;
