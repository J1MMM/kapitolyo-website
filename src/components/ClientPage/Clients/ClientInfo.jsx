import { Box, Button, FormControl, Typography } from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useData from "../../../hooks/useData";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import OutlinedTextField from "../../common/ui/OutlinedTextField";
import FlexRow from "../../common/ui/FlexRow";
import Fieldset from "../../common/ui/Fieldset";
import DialogForm from "../../common/ui/DialogForm";

const ClientInfo = ({ open, onClose, clientDetails }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setClasses } = useData();
  const [disable, setDisable] = useState(false);

  return (
    <DialogForm
      title="Client's Information"
      open={open}
      onClose={() => onClose(false)}
      actions={
        <Box pb={1} mr={2}>
          <Button disabled={disable}>
            <Typography component={"span"}>Transfer</Typography>
          </Button>
          <Button disabled={disable}>
            <Typography>Update</Typography>
          </Button>
        </Box>
      }
    >
      <FlexRow>
        <OutlinedTextField
          label="MTOP"
          readOnly={true}
          value={clientDetails?.mtop}
          sx={{ maxWidth: 250 }}
        />

        <FormControl margin="dense" focused>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker label="Date Renewal" readOnly />
          </LocalizationProvider>
        </FormControl>
      </FlexRow>

      <Fieldset legend="Owner's Information">
        <FlexRow>
          <OutlinedTextField
            label="Firstname"
            readOnly={true}
            value={clientDetails?.fname}
          />
          <OutlinedTextField
            label="MI"
            value={clientDetails?.mi}
            readOnly={true}
          />
          <OutlinedTextField
            label="Lastname"
            value={clientDetails?.lname}
            readOnly={true}
          />
        </FlexRow>
        <FlexRow>
          <OutlinedTextField
            label="Address"
            value={clientDetails?.address}
            readOnly={true}
          />
          <OutlinedTextField
            label="Contact number"
            value={clientDetails?.contact}
            readOnly={true}
          />
        </FlexRow>
      </Fieldset>

      <Fieldset legend="Driver's Information">
        <FlexRow>
          <OutlinedTextField
            label="Fullname"
            value={clientDetails?.drivername}
            readOnly={true}
          />
          <OutlinedTextField
            label="Contact number"
            value={clientDetails?.contact2}
            readOnly={true}
          />
        </FlexRow>
        <OutlinedTextField
          label="Address"
          value={clientDetails?.driveraddress}
          readOnly={true}
        />
      </Fieldset>

      <Fieldset legend="Vehicle's Information">
        <FlexRow>
          <OutlinedTextField
            label="Model"
            value={clientDetails?.model}
            readOnly={true}
          />
          <OutlinedTextField
            readOnly={true}
            label="Plate No."
            value={clientDetails?.plateno}
          />
        </FlexRow>
        <FlexRow>
          <OutlinedTextField
            label="Motor No."
            value={clientDetails?.motorno}
            readOnly={true}
          />
          <OutlinedTextField
            label="Stroke"
            value={clientDetails?.stroke}
            readOnly={true}
          />
        </FlexRow>
        <FlexRow>
          <OutlinedTextField
            label="Chassis No."
            value={clientDetails?.chassisno}
            readOnly={true}
          />
          <OutlinedTextField
            label="Fuel DISP.(cc)"
            value={clientDetails?.fueldisp}
            readOnly={true}
          />
        </FlexRow>
        <FlexRow>
          <OutlinedTextField
            label="OR No."
            value={clientDetails?.or}
            readOnly={true}
          />
          <OutlinedTextField
            label="CR No."
            value={clientDetails?.cr}
            readOnly={true}
          />
        </FlexRow>
        <FlexRow>
          <OutlinedTextField
            label="TPL Provider"
            value={clientDetails?.tplprovider}
            readOnly={true}
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
                <DatePicker slotProps={{ textField: { size: "small" } }} s />
              </LocalizationProvider>
            </Box>
          </FormControl>
        </FlexRow>
      </Fieldset>

      <Fieldset legend="Franchise Details">
        <FlexRow>
          <OutlinedTextField
            label="Type of Franchise"
            value={clientDetails?.tpfrnch}
            readOnly={true}
          />
          <OutlinedTextField
            label="Kind of Business"
            value={clientDetails?.kob}
            readOnly={true}
          />
        </FlexRow>

        <FlexRow>
          <OutlinedTextField
            label="TODA"
            value={clientDetails?.toc2}
            readOnly={true}
          />
          <OutlinedTextField
            label="Route"
            value={"San Pablo City"}
            readOnly={true}
          />
        </FlexRow>

        <OutlinedTextField
          label="Remarks"
          value={clientDetails?.remarks}
          readOnly={true}
        />
        <OutlinedTextField
          label="Complaints"
          value={clientDetails?.complaint}
          readOnly={true}
        />
      </Fieldset>
    </DialogForm>
  );
};

export default ClientInfo;
