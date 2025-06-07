/*
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales } = reportsLineChartData;

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobPreferredSkills: "",
    jobType: "",
    location: "",
    jobPreference: "",
    salaryRange: "",
    experienceLevel: "",
    applicationDeadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem("token");
      console.log(jwtToken);
      const response = await fetch("http://localhost:8080/HubzoneCareer/api/postings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });
      //		console.log('Response Status:', response.status);
      //		console.log('Response Body:', await response.text());
      if (response.status === 200) {
        const newJob = await response.json();

        console.log("Response is ok and the job is");
        console.log(newJob);
        //        onAddJob(newJob); // Pass the new job back to the parent to update the job list
        alert("Job posted successfully!");
      } else {
        alert("Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job");
    }

    // Reset the form after submission
    setFormData({
      jobTitle: "",
      jobDescription: "",
      jobPreferredSkills: "",
      jobType: "",
      location: "",
      jobPreference: "",
      salaryRange: "",
      experienceLevel: "",
      applicationDeadline: "",
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Profile views"
                  description="Last visit ..."
                  date="updated ..."
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Jobs Posted"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in this months postings.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox
                mb={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Button variant="contained" color="success" onClick={() => setOpen(true)}>
                  Post a Job
                </Button>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />

      {/* Post a Job Form Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Post a Job</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="jobTitle"
            label="Job Title"
            fullWidth
            variant="standard"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="jobDescription"
            label="Job Description"
            fullWidth
            multiline
            rows={3}
            variant="standard"
            value={formData.jobDescription}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="jobPreferredSkills"
            label="Preferred Skills"
            fullWidth
            variant="standard"
            value={formData.jobPreferredSkills}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="jobType"
            label="Job Type"
            fullWidth
            variant="standard"
            value={formData.jobType}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            fullWidth
            variant="standard"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="jobPreference"
            label="Job Preference"
            fullWidth
            variant="standard"
            value={formData.jobPreference}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="salaryRange"
            label="Salary Range"
            fullWidth
            variant="standard"
            value={formData.salaryRange}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="experienceLevel"
            label="Experience Level"
            fullWidth
            variant="standard"
            value={formData.experienceLevel}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="applicationDeadline"
            label="Application Deadline"
            fullWidth
            variant="standard"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Dashboard;
