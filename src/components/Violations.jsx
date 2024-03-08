import { Add } from '@mui/icons-material';
import { Box, Button, Divider, Grow, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import CreateClassModal from './CreateClassModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useData from '../hooks/useData';
import SnackBar from './SnackBar';
import emptyTable from '../assets/images/undraw_empty_re_opql.svg'
import EditClassModal from './EditClassModal';
import { DataGrid } from '@mui/x-data-grid';
import ClientInfo from './ClientInfo';
import ViolationsInfo from './ViolationsInfo';
import ViolationsNavbar from './ViolationsNavbar';


function sortByDate(array, datePropertyName) {
    return array.sort((a, b) => new Date(a[datePropertyName]) - new Date(b[datePropertyName]));
}

const columns = [
    {
        field: "mtop",
        headerName: "MTOP",
        width: 150, headerClassName: 'data-grid-header',
        editable: false,
        menu: false,
        option: false,
        sort: false,
        align: 'center',
        headerAlign: 'center',
        headerClassName: 'data-grid-header',
    },
    { field: "lname", headerName: "LASTNAME", width: 200, headerClassName: 'data-grid-header', editable: false },
    { field: "fname", headerName: "FIRSTNAME", width: 200, headerClassName: 'data-grid-header', editable: false },
    { field: "mi", headerName: "MI", width: 100, headerClassName: 'data-grid-header', editable: false },
    { field: "address", headerName: "ADDRESS", width: 200, headerClassName: 'data-grid-header', editable: false },
    {
        field: "contact",
        headerName: "CONTACT\u00a0NO.",
        width: 200, headerClassName: 'data-grid-header',
        editable: false,
    },
    {
        field: "contact2",
        headerName: "CONTACT\u00a0NO.2",
        width: 200, headerClassName: 'data-grid-header',
        editable: false,
    },
    { field: "toc2", headerName: "TODA", width: 200, headerClassName: 'data-grid-header', editable: false },
    {
        field: "drivername",
        headerName: "DRIVER'S\u00a0NAME",
        width: 280, headerClassName: 'data-grid-header',
        editable: false,
    },
    {
        field: "driveraddress",
        headerName: "DRIVER'S\u00a0ADDRESS",
        width: 200, headerClassName: 'data-grid-header',
        editable: false,
    },
    { field: "or", headerName: "O.R.", width: 200, headerClassName: 'data-grid-header', editable: false },
    { field: "cr", headerName: "C.R.", width: 200, headerClassName: 'data-grid-header', editable: false },
    {
        field: "driverlicenseno",
        headerName: "DRIVER'S\u00a0LICENSE\u00a0NO.",
        width: 200, headerClassName: 'data-grid-header',
        editable: false,
    },
    { field: "model", headerName: "MODEL", width: 150, headerClassName: 'data-grid-header', editable: false },
    {
        field: "motorno",
        headerName: "MOTOR\u00a0NO.",
        width: 200, headerClassName: 'data-grid-header',
        editable: false,
    },
    {
        field: "chassisno",
        headerName: "CHASSIS\u00a0NO.",
        width: 200, headerClassName: 'data-grid-header',
        editable: false,
    },
    {
        field: "plateno",
        headerName: "PLATE\u00a0NO.",
        width: 100, headerClassName: 'data-grid-header',
        editable: false,
    },
    { field: "stroke", headerName: "STROKE", width: 100, headerClassName: 'data-grid-header', editable: false, align: 'center', headerAlign: 'center' },
    { field: "date", headerName: "DATE RENEWAL", width: 150, headerClassName: 'data-grid-header', editable: false, align: 'center', headerAlign: 'center' },
    { field: "remarks", headerName: "REMARKS", width: 250, headerClassName: 'data-grid-header', editable: false, align: 'center', headerAlign: 'center' },
    {
        field: "daterelease",
        headerName: "DATE\u00a0RELEASE\u00a0OF\u00a0ST/TP",
        width: 200, headerClassName: 'data-grid-header',
        editable: false,
        align: 'center',
        headerAlign: 'center'

    },
    {
        field: "complaint",
        headerName: "COMPLAINT",
        width: 800, headerClassName: 'data-grid-header',
        editable: false,
        align: "center",
        headerAlign: 'center',
        headerColor: 'red'
    },
];

function createData(
    id,
    mtop,
    lname,
    fname,
    mi,
    address,
    contact,
    contact2,
    toc2,
    drivername,
    driveraddress,
    or,
    cr,
    driverlicenseno,
    model,
    motorno,
    chassisno,
    plateno,
    stroke,
    date,
    remarks,
    daterelease,
    complaint
) {
    return {
        id,
        mtop,
        lname,
        fname,
        mi,
        address,
        contact,
        contact2,
        toc2,
        drivername,
        driveraddress,
        or,
        cr,
        driverlicenseno,
        model,
        motorno,
        chassisno,
        plateno,
        stroke,
        date,
        remarks,
        daterelease,
        complaint,
    };
}

const Violations = () => {
    const axiosPrivate = useAxiosPrivate()
    const { classes, setClasses, setStudents, setStudentsArchived, setLessons } = useData()
    const [sortedClasses, setSortedClasses] = useState([])
    const [createClassModal, setCreateClassModal] = useState(false)
    const [editClassModal, setEditClassModal] = useState(false)

    const [idToUpdate, setIdToUpdate] = useState("")
    const [updatedSection, setUpdatedSection] = useState("")
    const [updatedGradeLevel, setUpdatedGradeLevel] = useState(1)
    const [updatedSchoolYear, setUpdatedSchoolYear] = useState(new Date())

    const [section, setSection] = useState("")
    const [gradeLevel, setGradeLevel] = useState(1)
    const [schoolYear, setSchoolYear] = useState(new Date())

    const [snack, setSnack] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [resMsg, setResMsg] = useState('')

    const [empty, setEmpty] = useState(false)
    const [noResponse, setNoResponse] = useState(false)
    const [clientInfo, setClientInfo] = useState(false);
    const [violationsInfo, setViolationsInfo] = useState(false);
    

    useEffect(() => {
        if (classes.length == 0) {
            setEmpty(true)
        } else {
            setEmpty(false)
        }
    }, [classes])

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Clients Management"
        let isMounted = true;
        const controller = new AbortController();

        const getClasses = async () => {
            try {
                const response = await axiosPrivate.get('/class', {
                    signal: controller.signal
                });

                isMounted && setClasses(response.data.filter(item => item.archive == false))
            } catch (err) {
                setNoResponse(true)
            }
        }

        getClasses()

        return () => {
            isMounted = false;
            isMounted && controller.abort();
        }
    }, [])
    return(
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 3,
                minHeight: '80vh',
            }}
        >
            <Box
                bgcolor='#fff'
                display='flex'
                justifyContent='space-between'
                pb={1}
                boxSizing='border-box'
                zIndex='99'
                sx={{
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row"
                    },
                    mb: {
                        xs: 0,
                        sm: 0,
                        md: 2
                    }
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={2}
                    width={'100%'}
                >
                    <ViolationsNavbar />
                    <Outlet />
                </Box>
            </Box>
        </Paper>
    )

    // useEffect(() => {
    //     setSortedClasses(v => sortByDate(classes, 'schoolYear'))

    // }, [classes])

    const [filterButtonEl, setFilterButtonEl] = useState(null);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [totalRows, setTotalRows] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axiosPrivate.get(`/franchise`);
                setTotalRows(response.data.totalRows);
                setRows(() => {
                    return response.data.rows.map((data) => {
                        return createData(
                            data._id,
                            data.MTOP,
                            data.LASTNAME,
                            data["FIRST NAME"],
                            data.MI,
                            data.ADDRESS,
                            data["CONTACT NO."],
                            data["CONTACT NO.2"],
                            data["TO+C2+H1:H4"],
                            data["DRIVER'S NAME"],
                            data["DRIVER'S ADDRESS"],
                            data["O.R."],
                            data["C.R."],
                            data["DRIVER'S LICENSE NO."],
                            data["MODEL"],
                            data["MOTOR NO."],
                            data["CHASSIS NO."],
                            data["PLATE NO"],
                            data["STROKE"],
                            data["DATE "],
                            data["REMARKS"],
                            data["DATE RELEASE OF ST/TP"],
                            data["COMPLAINT"]
                        );
                    });
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false)
        };
        fetchData();
    }, []);

    function countTrueValues(obj) {
        let count = 0;
        for (const key in obj) {
            if (obj[key] === true) {
                count++;
            }
        }
        return count;
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 3,
                minHeight: 'calc(100vh-80px)',
                position: 'relative',
                width: '100%',
                boxSizing: "border-box"

            }}
        >
            <Box
                bgcolor='#fff'
                display='flex'
                justifyContent='space-between'
                pb={1}
                boxSizing='border-box'
                zIndex='99'
                sx={{
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row"
                    },
                    mb: {
                        xs: 0,
                        sm: 0,
                        md: 0
                    }
                }}
            >
                <Box sx={{ mb: { xs: 1, sm: 1, md: 0 } }} >
                    <Box display='flex' alignItems='center' gap={1} mb={-.5}>
                        <Typography component={'span'} variant='h5' >Violations Management</Typography>
                    </Box>
                    <Typography component={'span'} variant='caption' color='InactiveCaptionText' >Manage all violators efficiently</Typography>
                </Box>

                <Box display='flex' alignItems='center' gap={2} sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>

                    <Button
                        variant='contained'
                        size='small'
                        onClick={() => setViolationsInfo(true)}
                        disableFocusRipple
                    >
                        <Add sx={{ color: '#FFF' }} />
                        <Typography component={'span'} pr={1} variant='caption' color="#FFF">
                            Add Violators
                        </Typography>
                    </Button>
                </Box>
            </Box>

            <Box
                display="flex"
                gap={3}
                flexWrap="wrap"
            >
                <DataGrid
                    ref={setFilterButtonEl}
                    columns={columns}
                    rows={rows}
                    rowCount={totalRows}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 50, 100]}
                    onCellDoubleClick={() => setClientInfo(true)}
                    paginationModel={{ page: page, pageSize: pageSize }}
                    onFilterModelChange={() => setPage(0)}
                    onPaginationModelChange={(e) => { setPage(e.page); setPageSize(e.pageSize) }}
                    onStateChange={(e) => setTotalRows(countTrueValues(e?.visibleRowsLookup))}
                    loading={isLoading}
                    disableRowSelectionOnClick
                    showCellVerticalBorder

                    sx={{
                        boxSizing: 'border-box',
                        maxHeight: '75vh',
                        height: '80vh',
                        width: '100%',


                        '.data-grid-header': {
                            bgcolor: '#150187',
                            color: '#FFF',
                            '.MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',

                            },
                            '&.MuiDataGrid-root': {
                                border: 'none',
                                color: '#FFF',
                            },
                            '.MuiIconButton-sizeSmall': {
                                color: '#FFF'
                            },
                        },
                    }}
                />

            </Box>


            <ViolationsInfo
                open={violationsInfo}
                onClose={setViolationsInfo}
                schoolYear={schoolYear}
                setSchoolYear={setSchoolYear}
                gradeLevel={gradeLevel}
                setGradeLevel={setGradeLevel}
                section={section}
                setSection={setSection}
                setResMsg={setResMsg}
                setSeverity={setSeverity}
                setSnack={setSnack}
            />

            <ClientInfo
                open={createClassModal}
                onClose={setCreateClassModal}
                schoolYear={schoolYear}
                setSchoolYear={setSchoolYear}
                gradeLevel={gradeLevel}
                setGradeLevel={setGradeLevel}
                section={section}
                setSection={setSection}
                setResMsg={setResMsg}
                setSeverity={setSeverity}
                setSnack={setSnack}
            />

        </Paper>
    );
}

export default Violations;
