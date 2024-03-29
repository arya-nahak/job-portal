import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  useTheme,
  Box,
  styled,
  MenuItem,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import ChipInput from "material-ui-chip-input";
import { Breadcrumb, SimpleCard } from "app/components";
// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// form field validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required!"),
  jobType: Yup.string().required("Job Type is required!"),
  duration: Yup.string().required("Duration is required!"),
  salary: Yup.string().required("Salary is required!"),
  deadline: Yup.string().required("Deadline is required!"),
  maxApplicant: Yup.string().required(
    "Maximum number of Applicant is required!"
  ),
  position: Yup.string().required("Position is required!"),
  description: Yup.string().required("Position is required!"),
});

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function Index() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [chipData, setChipData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    jobType: "",
    duration: "",
    salary: "",
    deadline: "",
    maxApplicant: "",
    position: "",
    description: "",
  });

  const handleFormSubmit = (values) => {
    setLoading(true);
    try {
      values.skills = chipData.skills;
      console.log(values, "kkkkkk");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleChipChange = (skills) => {
    setChipData((prevValues) => ({ ...prevValues, skills }));
  };

  return (
    // <JWTRegister>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          {/* <Card className="card"> */}
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Box p={4} height="100%">
                <TextField
                  fullWidth
                  size="medium"
                  type="text"
                  name="title"
                  label="title"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.title}
                  onChange={handleChange}
                  helperText={touched.title && errors.title}
                  error={Boolean(errors.title && touched.title)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  select
                  size="medium"
                  name="jobType"
                  label="Job Type"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.jobType || ""}
                  // onChange={handleChange}

                  onChange={(event) => {
                    handleChange("jobType", event.target.value);
                  }}
                  helperText={touched.jobType && errors.jobType}
                  error={Boolean(errors.jobType && touched.jobType)}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Work From Home">Work From Home</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  size="medium"
                  type="text"
                  name="deadline"
                  label="Application Deadline"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.deadline}
                  onChange={handleChange}
                  helperText={touched.deadline && errors.deadline}
                  error={Boolean(errors.deadline && touched.deadline)}
                  sx={{ mb: 3 }}
                />

                <ChipInput
                  // className={classes.inputBox}
                  style={{ width: "100%" }}
                  label="Skills"
                  variant="outlined"
                  name="skills"
                  helperText="Press enter to add skills"
                  onChange={(chips) => handleChipChange(chips)}
                />
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Box p={4} height="100%">
                <TextField
                  fullWidth
                  size="medium"
                  type="text"
                  name="salary"
                  label="salary"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.salary}
                  onChange={handleChange}
                  helperText={touched.salary && errors.salary}
                  error={Boolean(errors.salary && touched.salary)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  select
                  fullWidth
                  size="medium"
                  type="text"
                  name="duration"
                  label="duration"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.duration || ""}
                  // onChange={handleChange}
                  onChange={(event) => {
                    handleChange("duration", event.target.value);
                  }}
                  helperText={touched.duration && errors.duration}
                  error={Boolean(errors.duration && touched.duration)}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value={0}>Flexible</MenuItem>
                  <MenuItem value={1}>1 Month</MenuItem>
                  <MenuItem value={2}>2 Months</MenuItem>
                  <MenuItem value={3}>3 Months</MenuItem>
                  <MenuItem value={4}>4 Months</MenuItem>
                  <MenuItem value={5}>5 Months</MenuItem>
                  <MenuItem value={6}>6 Months</MenuItem>
                </TextField>

                {/* <Grid item xs={3}> */}
                <Stack spacing={2} direction={"row"} sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    size="medium"
                    type="text"
                    name="maxApplicant"
                    label="Maximum Applicants"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.maxApplicant}
                    onChange={handleChange}
                    helperText={touched.maxApplicant && errors.maxApplicant}
                    error={Boolean(errors.maxApplicant && touched.maxApplicant)}
                  />

                  <TextField
                    fullWidth
                    size="medium"
                    type="text"
                    name="position"
                    label="Position Available"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.position}
                    onChange={handleChange}
                    helperText={touched.position && errors.position}
                    error={Boolean(errors.position && touched.position)}
                  />
                </Stack>

                <TextField
                  label="Job Description (upto 250 words)"
                  name="description"
                  multiline
                  rows={2}
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={values.bio}
                  onChange={handleChange}
                  helperText={touched.description && errors.description}
                  error={Boolean(errors.description && touched.description)}
                  sx={{ mb: 3 }}
                />

                <Grid item display={"flex"} justifyContent={"end"}>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ mt: 3 ,px: 4 }}
                  >
                    Create
                  </LoadingButton>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          {/* </Card> */}
        </form>
      )}
    </Formik>
    // </JWTRegister>
  );
}

export default function AppForm() {
  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material", path: "/material" },
            { name: "Form" },
          ]}
        />
      </Box> */}

      <Stack spacing={3}>
        <SimpleCard title="Add Job">
          <Index />
        </SimpleCard>
      </Stack>
    </Container>
  );
}
