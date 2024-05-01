import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddClearanceRecord({
  clearenceRecord,
  action,
  handleUpdatedCount,
  place,
}) {
  const [intake, setIntake] = useState(
    action == "edit" ? clearenceRecord.intake : ""
  );
  const [fullName, setFullName] = useState(
    action == "edit" ? clearenceRecord.fullName : ""
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    action == "edit" ? clearenceRecord.registrationNumber : ""
  );
  const [degree, setDegree] = useState(
    action == "edit" ? clearenceRecord.degree : ""
  );
  const [date, setDate] = useState(
    action == "edit"
      ? clearenceRecord.clearenceDetails[0].date
      : dayjs().format("YYYY-MM-DD")
  );
  const [itemName, setItemName] = useState(
    action == "edit" ? clearenceRecord.clearenceDetails[0].name : ""
  );
  const [itemValue, setItemValue] = useState(
    action == "edit" ? clearenceRecord.clearenceDetails[0].value : ""
  );
  const [itemDescription, setItemDescription] = useState(
    action == "edit" ? clearenceRecord.clearenceDetails[0].description : ""
  );

  const handleIntakeChange = (event) => {
    setIntake(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
  };

  const handleRegistrationNumberChange = (event) => {
    setRegistrationNumber(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemValueChange = (event) => {
    setItemValue(event.target.value);
  };
  const handleItemDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (
      !intake ||
      !fullName ||
      !registrationNumber ||
      !degree ||
      !date ||
      !itemName ||
      !itemValue ||
      !itemDescription
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    const formData = {
      intake,
      fullName,
      registrationNumber,
      degree,
      clearenceDetails: [
        {
          date: dayjs(date).format("YYYY-MM-DD"),
          name: itemName,
          value: itemValue,
          description: itemDescription,
          place,
        },
      ],
    };

    const httpMethod = action === "edit" ? "put" : "post";

    const url =
      action === "edit"
        ? `https://us-central1-clear-flow-9e0f0.cloudfunctions.net/ClearFlow/data/${clearenceRecord.id}`
        : "https://us-central1-clear-flow-9e0f0.cloudfunctions.net/ClearFlow/data";

    axios[httpMethod](url, formData)
      .then((response) => {
        if (httpMethod === "post") {
          toast.success("New clearance record created successfully.");
        } else {
          toast.success("Clearance record updated successfully.");
          handleUpdatedCount();
        }
      })
      .catch((error) => {
        toast.error("Error sending data");
        console.error("Error sending data", error);
      });
  };

  return (
    <>
      {" "}
      <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
        <Typography variant="h6" component="h6">
          Student Details
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="intake-name-label">Intake</InputLabel>
            <Select
              labelId="intake-name-label"
              id="intake-name"
              value={intake}
              onChange={handleIntakeChange}
            >
              <MenuItem value="Intake 38">Intake 38</MenuItem>
              <MenuItem value="Intake 39">Intake 39</MenuItem>
              <MenuItem value="Intake 40">Intake 40</MenuItem>
              <MenuItem value="Intake 41">Intake 41</MenuItem>
              {/* Add more intake options as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="registation-number"
            label="Registration Number"
            value={registrationNumber}
            onChange={handleRegistrationNumberChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="full-name"
            label="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="degree-name-label">Degree</InputLabel>
            <Select
              labelId="degree-name-label"
              id="degree-name"
              value={degree}
              onChange={handleDegreeChange}
            >
              <MenuItem value="Information Technology">
                Information Technology
              </MenuItem>
              <MenuItem value="Information Systems">
                Information Systems
              </MenuItem>
              <MenuItem value="Quantity Survey">Quantity Survey</MenuItem>
              <MenuItem value="Survey Science">Survey Science</MenuItem>
              <MenuItem value="Architecture">Architecture</MenuItem>

              {/* Add more intake options as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ paddingLeft: "20px" }}>
        <Typography variant="h6" component="h6">
          Asset Details
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="item-name"
            label="Item Name"
            value={itemName}
            onChange={handleItemNameChange}
            sx={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="item-description"
            label="Item Description"
            value={itemDescription}
            onChange={handleItemDescriptionChange}
            sx={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="item-value"
            label="Item Value"
            value={itemValue}
            onChange={handleItemValueChange}
            sx={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                sx={{ width: "100%" }}
                defaultValue={dayjs(new Date(date))}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box sx={{ textAlign: "center" }}>
            <Button variant="contained" onClick={handleSubmit} fullWidth>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
