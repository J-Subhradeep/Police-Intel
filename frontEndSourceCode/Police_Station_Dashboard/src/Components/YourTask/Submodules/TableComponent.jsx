import React from "react";
import { TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Typography, TablePagination, Paper,  } from "@mui/material";
import * as config from "../../../GlobalConfig/config";
import { orange, red, green } from "@mui/material/colors";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";

const TableComponent = ({ tableData, pageCount, handleChangePage, page, rowsPerPage, handleChangeRowsPerPage, handleTaskClick }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <TableContainer
                component={Paper}
                sx={{
                    border: "0.5px solid  #979797", width: "950px", marginTop: "30px"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ background: config.color5 }}>
                            <TableCell sx={{ color: config.color9, fontSize: "20px", paddingLeft: "70px" }}>Task No</TableCell>
                            <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Task Title</TableCell>
                            <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Assigned Time</TableCell>
                            <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Deadline</TableCell>
                            <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ cursor: 'pointer' }}>
                        {tableData
                            .map((task, index) => (
                                <TableRow key={task.id} sx={{ '&:hover': { backgroundColor: config.color8 } }} onClick={() => handleTaskClick(task)}>
                                    <TableCell sx={{ paddingLeft: "80px" }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ paddingRight: "80px" }}>{task.title}</TableCell>
                                    <TableCell>{task.assignedTime}</TableCell>
                                    <TableCell>{task.deadline}</TableCell>
                                    <TableCell>


                                        <Typography variant="body1" display="inline">
                                            {task.status === false && new Date(task.deadline) >= new Date() && (
                                                <ScheduleIcon
                                                    sx={{ color: orange[500], verticalAlign: "middle" }} />
                                            )}
                                            {new Date(task.deadline) < new Date() && task.status === false && (
                                                <ErrorIcon
                                                    sx={{ color: red[500], verticalAlign: "middle" }}
                                                />
                                            )}
                                            {task.status === true && (
                                                <DoneIcon
                                                    sx={{ color: green[500], verticalAlign: "middle" }}
                                                />
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
            </TableContainer>
        </div>
    );
};

export default TableComponent;