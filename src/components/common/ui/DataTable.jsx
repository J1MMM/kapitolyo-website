import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const DataTable = ({ columns, rows, rowCount, onCellDoubleClick, page, pageSize, onFilterModelChange, onPaginationModelChange, onStateChange, loading }) => {
    return (
        <DataGrid
            columns={columns}
            rows={rows}
            rowCount={rowCount}
            initialState={{
                pagination: {
                    paginationModel: {
                        page: 0,
                        pageSize: 50,
                    },
                },
            }}
            pageSizeOptions={[10, 50, 100]}
            onCellDoubleClick={onCellDoubleClick}
            paginationModel={{ page: page, pageSize: pageSize }}
            onFilterModelChange={onFilterModelChange}
            onPaginationModelChange={onPaginationModelChange}
            onStateChange={onStateChange}
            loading={loading}
            disableRowSelectionOnClick
            showCellVerticalBorder
            sx={{
                boxSizing: "border-box",
                maxHeight: "70vh",
                height: "80vh",
                width: "100%",
                ".data-grid-header": {
                    bgcolor: "#150187",
                    color: "#FFF",
                    ".MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "bold",
                    },
                    "&.MuiDataGrid-root": {
                        border: "none",
                        color: "#FFF",
                    },
                    ".MuiIconButton-sizeSmall": {
                        color: "#FFF",
                    },
                },
            }}
        />
    );
}

export default DataTable;
