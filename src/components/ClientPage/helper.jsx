function createClientsData(
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

const clientsColumns = [
    {
        field: "mtop",
        headerName: "MTOP",
        width: 150,
        headerClassName: "data-grid-header",
        editable: false,
        menu: false,
        option: false,
        sort: false,
        align: "center",
        headerAlign: "center",
        headerClassName: "data-grid-header",
    },
    {
        field: "lname",
        headerName: "LASTNAME",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "fname",
        headerName: "FIRSTNAME",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "mi",
        headerName: "MI",
        width: 100,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "address",
        headerName: "ADDRESS",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "contact",
        headerName: "CONTACT\u00a0NO.",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "contact2",
        headerName: "CONTACT\u00a0NO.2",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "toc2",
        headerName: "TODA",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "drivername",
        headerName: "DRIVER'S\u00a0NAME",
        width: 280,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "driveraddress",
        headerName: "DRIVER'S\u00a0ADDRESS",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "or",
        headerName: "O.R.",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "cr",
        headerName: "C.R.",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "driverlicenseno",
        headerName: "DRIVER'S\u00a0LICENSE\u00a0NO.",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "model",
        headerName: "MODEL",
        width: 150,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "motorno",
        headerName: "MOTOR\u00a0NO.",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "chassisno",
        headerName: "CHASSIS\u00a0NO.",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "plateno",
        headerName: "PLATE\u00a0NO.",
        width: 100,
        headerClassName: "data-grid-header",
        editable: false,
    },
    {
        field: "stroke",
        headerName: "STROKE",
        width: 100,
        headerClassName: "data-grid-header",
        editable: false,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "date",
        headerName: "DATE RENEWAL",
        width: 150,
        headerClassName: "data-grid-header",
        editable: false,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "remarks",
        headerName: "REMARKS",
        width: 250,
        headerClassName: "data-grid-header",
        editable: false,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "daterelease",
        headerName: "DATE\u00a0RELEASE\u00a0OF\u00a0ST/TP",
        width: 200,
        headerClassName: "data-grid-header",
        editable: false,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "complaint",
        headerName: "COMPLAINT",
        width: 800,
        headerClassName: "data-grid-header",
        editable: false,
        align: "center",
        headerAlign: "center",
        headerColor: "red",
    },
];

function countTrueValues(obj) {
    let count = 0;
    for (const key in obj) {
        if (obj[key] === true) {
            count++;
        }
    }
    return count;
}

export default { createClientsData, clientsColumns, countTrueValues }