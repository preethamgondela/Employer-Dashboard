import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

function Projects() {
  const navigate = useNavigate();

  const [columns] = useState([
    { Header: "Job Title", accessor: "title", align: "left" },
    { Header: "Applicants", accessor: "applicants", align: "center" },
  ]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:8080/HubzoneCareer/api/emppostings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const jobs = response.data;

        const formattedRows = await Promise.all(
          jobs.map(async (job) => {
            let applicantCount = 0;

            // Fetch applicants for this job to get a live count
            try {
              const applicantsResponse = await axios.get(
                `http://localhost:8080/HubzoneCareer/api/applications/job/${job.jobPostingId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              applicantCount = applicantsResponse.data.length;
            } catch (err) {
              console.error(`Failed to fetch applicants for job ID ${job.jobPostingId}:`, err);
            }

            return {
              title: (
                <MDTypography
                  variant="button"
                  fontWeight="medium"
                  sx={{ cursor: "pointer", color: "info.main" }}
                  onClick={() => {
                    if (job.jobPostingId) {
                      navigate(`/employer/job/${job.jobPostingId}`);
                    } else {
                      console.error("Missing job ID:", job);
                    }
                  }}
                >
                  {job.jobTitle}
                </MDTypography>
              ),
              applicants: applicantCount,
            };
          })
        );

        setRows(formattedRows);
      } catch (error) {
        console.error("Failed to fetch job postings:", error);
      }
    };

    fetchJobs();
  }, [navigate]);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Posted Jobs
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{ fontWeight: "bold", color: ({ palette: { info } }) => info.main, mt: -0.5 }}
            >
              work
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{rows.length}</strong> jobs listed
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;

/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";

// // @mui material components
// import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React examples
// import DataTable from "examples/Tables/DataTable";

// // Data
// import data from "layouts/dashboard/components/Projects/data";

// function Projects() {
//   const { columns, rows } = data();
//   const [menu, setMenu] = useState(null);

//   const openMenu = ({ currentTarget }) => setMenu(currentTarget);
//   const closeMenu = () => setMenu(null);

//   const renderMenu = (
//     <Menu
//       id="simple-menu"
//       anchorEl={menu}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "left",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={Boolean(menu)}
//       onClose={closeMenu}
//     >
//       <MenuItem onClick={closeMenu}>Sort by date</MenuItem>
//       <MenuItem onClick={closeMenu}>Sort by completion</MenuItem>
//       <MenuItem onClick={closeMenu}>Sort by </MenuItem>
//     </Menu>
//   );

//   return (
//     <Card>
//       <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
//         <MDBox>
//           <MDTypography variant="h6" gutterBottom>
//             Saved Job Applications
//           </MDTypography>
//           <MDBox display="flex" alignItems="center" lineHeight={0}>
//             <Icon
//               sx={{
//                 fontWeight: "bold",
//                 color: ({ palette: { info } }) => info.main,
//                 mt: -0.5,
//               }}
//             >
//               done
//             </Icon>
//             <MDTypography variant="button" fontWeight="regular" color="text">
//               &nbsp;<strong>30 done</strong> this month
//             </MDTypography>
//           </MDBox>
//         </MDBox>
//         <MDBox color="text" px={2}>
//           <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
//             more_vert
//           </Icon>
//         </MDBox>
//         {renderMenu}
//       </MDBox>
//       <MDBox>
//         <DataTable
//           table={{ columns, rows }}
//           showTotalEntries={false}
//           isSorted={false}
//           noEndBorder
//           entriesPerPage={false}
//         />
//       </MDBox>
//     </Card>
//   );
// }

// export default Projects;
