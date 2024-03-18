import { Box, Typography } from "@mui/material";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import React from "react";
import emptyImg from "../../../assets/images/empty.svg";

const EmptyRowsOverlay = () => (
  <GridOverlay>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <img src={emptyImg} alt="" style={{ width: "100%", maxWidth: 100 }} />
      <Typography color="gray">No data found</Typography>
    </Box>
  </GridOverlay>
);

const DataTable = ({
  columns,
  rows,
  rowCount,
  onCellDoubleClick,
  page,
  pageSize,
  onFilterModelChange,
  onPaginationModelChange,
  onStateChange,
  loading,
}) => {
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
          bgcolor: "#1A237E",
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
      slots={{
        noRowsOverlay: EmptyRowsOverlay,
      }}
    />
  );
};

export default DataTable;
