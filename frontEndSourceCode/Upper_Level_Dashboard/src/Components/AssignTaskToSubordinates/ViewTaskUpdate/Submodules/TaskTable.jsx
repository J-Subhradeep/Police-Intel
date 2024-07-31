import { Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Paper, TableBody } from '@mui/material'
import React from 'react'
import { orange, red, green } from "@mui/material/colors";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import * as config from '../../../../GlobalConfig/config'

const TaskTable = ({ handleTaskClick, tableOpen, tableData, pageCount, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {tableOpen && <TableContainer
                component={Paper}
                sx={{ border: "0.5px solid  #979797", width: "950px", marginTop: "30px" }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: config.color.color5, }}>
                            <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Task No</TableCell>
                            <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Task Title</TableCell>
                            <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Assigned Time</TableCell>
                            <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Deadline</TableCell>
                            <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ cursor: 'pointer' }}>
                        {tableData
                            .map((task, index) => (
                                <TableRow key={task.id} sx={{ '&:hover': { backgroundColor: config.color.color8 } }} onClick={() => handleTaskClick(task)}>
                                    <TableCell sx={{ paddingLeft: "80px" }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ paddingRight: "80px" }}>{task.title}</TableCell>
                                    <TableCell>{task.assignedTime}</TableCell>
                                    <TableCell>{task.deadline}</TableCell>
                                    <TableCell>


                                        <Typography variant="body1" display="inline">
                                            {task.status === false && new Date(task.deadline) >= new Date() && (
                                                <div>
                                                    Pending
                                                    <ScheduleIcon
                                                        sx={{ marginLeft: "5px", color: orange[500], verticalAlign: "middle" }} />
                                                </div>
                                            )}
                                            {new Date(task.deadline) < new Date() && task.status === false && (
                                                <div>
                                                    Missed
                                                    <ErrorIcon
                                                        sx={{ marginLeft: "5px", color: red[500], verticalAlign: "middle" }}
                                                    />
                                                </div>
                                            )}
                                            {task.status === true && (
                                                <div>
                                                    Done
                                                    <DoneIcon
                                                        sx={{ marginLeft: "5px", color: green[500], verticalAlign: "middle" }} />
                                                </div>
                                            )}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={pageCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}

                />
            </TableContainer>}
        </div>
    )
}

export default TaskTable
