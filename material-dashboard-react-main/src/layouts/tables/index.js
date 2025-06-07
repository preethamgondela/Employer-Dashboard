// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// // Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

// function Tables() {
//   const { columns, rows } = authorsTableData();
//   const { columns: pColumns, rows: pRows } = projectsTableData();

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Authors Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Projects Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns: pColumns, rows: pRows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Tables;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

EmployerJobDetail.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};

function EmployerJobDetail() {
  //const { jobPostingId } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

  const { id } = useParams(); // changed from jobPostingId

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8080/HubzoneCareer/api/job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Error fetching job details", err));

    axios
      .get(`http://localhost:8080/HubzoneCareer/api/applications/job/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Applicants data:", res.data);
        setApplicants(res.data);
      })
      .catch((err) => console.error("Error fetching applicants", err));
  }, [id]);

  const handleViewResume = async (applicationId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/HubzoneCareer/api/applications/api/resume/${applicationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      // Get the content-type and create blob
      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: contentType });

      // Determine file extension from contentType (simple example)
      let extension = "pdf";
      if (contentType === "application/msword") extension = "doc";
      else if (
        contentType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
        extension = "docx";

      // Create a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `resume.${extension}`; // <-- Set file name here
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading resume", error);
      alert("Failed to download resume");
    }
  };

  const applicantColumns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "Phone", accessor: "phone", align: "left" },
    {
      Header: "Resume",
      accessor: "applicationId", // assuming you have this field
      Cell: ({ cell: { value } }) => (
        <Button variant="text" color="info" size="small" onClick={() => handleViewResume(value)}>
          View Resume
        </Button>
      ),
    },
  ];

  const applicantRows = applicants.map((a) => ({
    name: a.applicant.firstName,
    email: a.applicant.email,
    phone: a.applicant.mobileNumber,
    //resumeUrl: `http://localhost:8080/HubzoneCareer/api/resume/${a.id}`,
    applicationId: a.id,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Job Details
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                {job && (
                  <>
                    <MDTypography variant="h5">{job.jobTitle}</MDTypography>
                    <MDTypography variant="body1">Location : {job.location}</MDTypography>
                    <MDTypography variant="body2">
                      Job Description : {job.jobDescription}
                    </MDTypography>
                    <MDTypography variant="body2">Salary : {job.salaryRange}</MDTypography>
                    <MDTypography variant="body2">Job Type : {job.jobType}</MDTypography>
                  </>
                )}
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Applicants
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: applicantColumns, rows: applicantRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EmployerJobDetail;
