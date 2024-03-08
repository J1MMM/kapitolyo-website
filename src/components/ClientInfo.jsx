import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ClientInfo = ({
  open,
  onClose,
  setSnack,
  setSeverity,
  setResMsg,
  clientDetails,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { setClasses } = useData();
  const [disable, setDisable] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      disableAutoFocus
      maxWidth="xl"
    >
      <form>
        <DialogTitle variant="h5" bgcolor="primary.main" color="#FFF">
          Client's Information
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "space-between",
            }}
          >
            <TextField
              margin="dense"
              label="MTOP"
              type="text"
              variant="outlined"
              value={clientDetails?.mtop}
              inputProps={{readOnly:true}}
            />

            <FormControl margin="dense" focused>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker label="Date Renewal" readOnly />
              </LocalizationProvider>
            </FormControl>
          </Box>
          <Box
            component={"fieldset"}
            sx={{
              borderColor: "#E7EBF1",
              border: "2px solid grey",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <legend style={{ color: "grey" }}>Owner's Information</legend>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="Firstname"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.fname}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Middlename"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.mi}
                inputProps={{readOnly:true}}y 
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Lastname"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.lname}
                inputProps={{readOnly:true}}
              />
            </Box>

            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.address}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Contact #"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.contact}
                inputProps={{readOnly:true}}
              />
            </Box>
          </Box>
          <Box
            component={"fieldset"}
            sx={{
              borderColor: "#E7EBF1",
              border: "2px solid grey",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <legend style={{ color: "grey" }}>Driver's Information</legend>

            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="Fullname"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.drivername}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Contact #"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.contact2}
                inputProps={{readOnly:true}}
              />
            </Box>
            <TextField
              disabled={disable}
              margin="dense"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={clientDetails?.driveraddress}
              inputProps={{readOnly:true}}
            />
          </Box>

          <Box
            component={"fieldset"}
            sx={{
              borderColor: "#E7EBF1",
              border: "2px solid grey",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <legend style={{ color: "grey" }}>Vehicle's Information</legend>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="Model"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.model}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Plate No."
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.plateno}
                inputProps={{readOnly:true}}
              />
            </Box>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="Motor No."
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.motorno}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Stroke"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.stroke}
                inputProps={{readOnly:true}}
              />
            </Box>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="Chassis No."
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.chassisno}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Fuel DISP.(cc)"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.fueldisp}
                inputProps={{readOnly:true}}
              />
            </Box>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="OR No."
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.or}
                inputProps={{readOnly:true}}
              />

              <TextField
                disabled={disable}
                margin="dense"
                label="CR No."
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.cr}
                inputProps={{readOnly:true}}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="TPL Provider"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.tplprovider}
                inputProps={{readOnly:true}}
              />

              <FormControl margin="dense" fullWidth>
                <Box
                  component={"fieldset"}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  borderRadius={1}
                  border="1px solid lightgrey"
                >
                  <legend style={{ color: "gray" }}>TPL Effectivity</legend>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker slotProps={{ textField: { size: "small" } }} />
                  </LocalizationProvider>
                  <Typography variant="subtitle1" color="grey">
                    to
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      slotProps={{ textField: { size: "small" } }}
                      s
                    />
                  </LocalizationProvider>
                </Box>
              </FormControl>
            </Box>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            ></Box>
          </Box>

          <Box
            component={"fieldset"}
            sx={{
              borderColor: "#E7EBF1",
              border: "2px solid grey",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <legend style={{ color: "grey" }}>Franchise Details</legend>
            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="Type of Franchise"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.tpfrnch}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={disable}
                margin="dense"
                label="Kind of Business"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.kob}
                inputProps={{readOnly:true}}
              />
            </Box>

            <Box
              display="flex"
              gap={2}
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <TextField
                disabled={disable}
                margin="dense"
                label="TODA"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={clientDetails?.toc2}
                inputProps={{readOnly:true}}
              />
              <TextField
                disabled={true}
                margin="dense"
                label="Route"
                type="text"
                fullWidth
                variant="outlined"
                value={"San Pablo City"}
                inputProps={{readOnly:true}}
              />
            </Box>

            <TextField
              disabled={disable}
              margin="dense"
              label="Remarks"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={clientDetails?.remarks}
              inputProps={{readOnly:true}}
            />
            <TextField
              disabled={disable}
              margin="dense"
              label="Complaints"
              type="text"
              fullWidth
              variant="outlined"
              required
              value={clientDetails?.complaint}
              inputProps={{readOnly:true}}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={disable}
            onClick={() => onClose(false)}
            color="inherit"
            sx={{ mb: 1 }}
          >
            <Typography>Update</Typography>
          </Button>
          <Button type="submit" disabled={disable} sx={{ mr: 1, mb: 1 }}>
            {disable && <CircularProgress size={16} color="inherit" />}{" "}
            <Typography component={"span"} ml={1}>
              {disable ? "Loading..." : "Transfer"}
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClientInfo;
