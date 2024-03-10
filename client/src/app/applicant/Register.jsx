import { ErrorMessage, Formik } from "formik";
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
  Button,
  Stack,
  makeStyles,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    maxWidth: 1000,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// form field validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  education: Yup.array()
    .of(
      Yup.object().shape({
        instituteName: Yup.string().required("Institute Name is required"),
        startYear: Yup.string().required("Start Year is required"),
        endYear: Yup.string().required("End Year is required"),
      })
    )
    .min(1, "At least one item is required"),
});

export default function ApplicantSignUp() {
  const [resume, setResume] = useState(null);
  const [profile, setProfile] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    education: [{ instituteName: "", startYear: "", endYear: "" }],
    // skills: [],
    resume: null,
    profile: null,
  });

  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [chipData, setChipData] = useState([]);

  const handleFormSubmit = (values) => {
    setLoading(true);
    try {
      values.skills = chipData.skills;
      values.resume = resume;
      values.profile = profile;
      // register(values.email, values.name, values.password);
      // navigate("/");
      console.log(values, "kkkkkk");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // const handleChipChange = (chips) => {
  //   console.log(chips, initialValues);
  //   setInitialValues({...initialValues,skills: chips});
  // };

  const handleChipChange = (skills) => {
    setChipData((prevValues) => ({ ...prevValues, skills }));
  };

  // const handleAddItem = (setFieldValue, values) => {
  //   const lastItem = values.education[values.education.length - 1];

  //   if (lastItem.name.trim() === "" || lastItem.age === "") {
  //     setInitialValues({ ...values, blankItemIndex: values.education.length - 1 });
  //   } else {
  //     setFieldValue("education", [...values.education, { name: "", age: "" }]);
  //     setInitialValues({ ...values, blankItemIndex: null });
  //   }
  // };

  const handleAddItem = (index, setFieldValue, values) => {
    // console.log(index, "index");
    // console.log(values.education.length, "length");
    // console.log(values.education, "value");
    const lastItem = values.education[values.education.length - 1];

    if (
      lastItem.instituteName.trim() === "" ||
      lastItem.startYear === "" ||
      lastItem.endYear === ""
    ) {
      console.error("Please fill in all fields before adding a new item");
    } else {
      const newItem = { instituteName: "", startYear: "", endYear: "" };
      setFieldValue("education", [...values.education, newItem]);
    }
  };

  const handleRemoveItem = (index, setFieldValue, values) => {
    if (values.education.length > 1) {
      const updatedItems = [...values.education];
      updatedItems.splice(index, 1);
      setFieldValue("education", updatedItems);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="name"
                      label="Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                      error={Boolean(errors.name && touched.name)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 3 }}
                    />

                    {values.education.map((item, index) => (
                      <Grid
                        container
                        key={index}
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                        sx={{ mb: 3 }}
                        spacing={1}
                      >
                        {/* Input fields for each item */}
                        <Grid item xs={4}>
                          <TextField
                            size="small"
                            type="text"
                            name={`education[${index}].instituteName`}
                            value={values.education[index].instituteName || ""}
                            label={"Institute Name"}
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            // error={Boolean(errors.education.instituteName && touched.name)}
                          />
                          <ErrorMessage
                            name={`education[${index}].instituteName`}
                            component="div"
                            className="error"
                            style={{
                              color: "#FF3D57",
                              fontWeight: 400,
                              fontSize: "0.75rem",
                              lineHeight: 1.66,
                              letterSpacing: "0.03333em",
                              textAlign: "left",
                              marginTop: "4px",
                              marginRight: "14px",
                              marginBottom: 0,
                              marginLeft: "14px",
                            }}
                          />
                        </Grid>

                        <Grid item xs={3.5}>
                          <TextField
                            size="small"
                            type="text"
                            value={values.education[index].startYear || ""}
                            name={`education[${index}].startYear`}
                            label="Start Year"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name={`education[${index}].startYear`}
                            component="div"
                            className="error"
                            style={{
                              color: "#FF3D57",
                              fontWeight: 400,
                              fontSize: "0.75rem",
                              lineHeight: 1.66,
                              letterSpacing: "0.03333em",
                              textAlign: "left",
                              marginTop: "4px",
                              marginRight: "14px",
                              marginBottom: 0,
                              marginLeft: "14px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={3.5}>
                          <TextField
                            size="small"
                            type="text"
                            value={values.education[index].endYear || ""}
                            name={`education[${index}].endYear`}
                            label="End Year"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name={`education[${index}].endYear`}
                            component="div"
                            className="error"
                            style={{
                              color: "#FF3D57",
                              fontWeight: 400,
                              fontSize: "0.75rem",
                              lineHeight: 1.66,
                              letterSpacing: "0.03333em",
                              textAlign: "left",
                              marginTop: "4px",
                              marginRight: "14px",
                              marginBottom: 0,
                              marginLeft: "14px",
                            }}
                          />
                        </Grid>
                        {/* Button to remove the item (optional) */}
                        <Grid item xs={1}>
                          <Stack>
                            {" "}
                            <Button
                              sx={{
                                marginX: 0,
                                padding: 0,
                                minWidth: 20,
                                color: "red",
                              }}
                              variant="text"
                              type="button"
                              onClick={() =>
                                handleRemoveItem(index, setFieldValue, values)
                              }
                            >
                              <DeleteOutlineIcon
                                fontSize="small"
                                color="danger"
                              />
                            </Button>
                            {/* Button to add a new item */}
                            <Button
                              variant="text"
                              type="button"
                              sx={{ marginX: 0, padding: 0, minWidth: 20 }}
                              onClick={() =>
                                handleAddItem(index, setFieldValue, values)
                              }
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    ))}

                    <Grid item xs={12} sx={{ mb: 4, height: "20%" }}>
                      <ChipInput
                        // className={classes.inputBox}
                        style={{ width: "100%" }}
                        label="Skills"
                        variant="outlined"
                        name="skills"
                        helperText="Press enter to add skills"
                        onChange={(chips) => handleChipChange(chips)}
                      />
                    </Grid>

                    <Grid
                      container
                      item
                      xs={12}
                      direction="column"
                      sx={{ mb: 3 }}
                    >
                      <Grid container item xs={12} spacing={0}>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <DescriptionIcon fontSize="small" />
                            <input
                              type="file"
                              hidden
                              // style={{ display: "none" }}
                              onChange={(event) => {
                                // console.log(event.target.files);
                                // setUploadPercentage(0);
                                setResume(event.target.files[0]);
                              }}
                              // onChange={onChange}
                              // onChange={
                              //   (e) => {}
                              //   //   setSource({ ...source, place_img: e.target.files[0] })
                              // }
                            />
                          </Button>
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            size="small"
                            label="Resume (.pdf .docx .txt) *"
                            value={resume ? resume.name || "" : ""}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="outlined"
                            style={{ width: "100%" }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      xs={12}
                      direction="column"
                      sx={{ mb: 3 }}
                    >
                      <Grid container item xs={12} spacing={0}>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <AccountCircleIcon fontSize="small" />
                            <input
                              type="file"
                              style={{ display: "none" }}
                              onChange={(event) => {
                                // console.log(event.target.files);
                                // setUploadPercentage(0);
                                setProfile(event.target.files[0]);
                              }}
                              // onChange={onChange}
                              // onChange={
                              //   (e) => {}
                              //   //   setSource({ ...source, place_img: e.target.files[0] })
                              // }
                            />
                          </Button>
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            size="small"
                            label="Profile (.jpg .jpeg .png) *"
                            value={profile ? profile.name || "" : ""}
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="outlined"
                            style={{ width: "100%" }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2 }}
                    >
                      Register
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/applicant/signin"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
}
