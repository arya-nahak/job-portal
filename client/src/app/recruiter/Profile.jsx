import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  useTheme,
  Box,
  styled,
  Stack,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import ChipInput from "material-ui-chip-input";
import { Breadcrumb, SimpleCard } from "app/components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
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
  name: Yup.string().required("Name is required!"),
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
  const [contactNumber, setContactNumber] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });

  const handleFormSubmit = (values) => {
    setLoading(true);
    try {
      values.contactNumber = contactNumber;
      console.log(values, "kkkkkk");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
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
          <Grid container justifyContent={"center"}>
            <Grid item sm={6} xs={12}>
              <Box p={4} height="100%">
                <TextField
                  fullWidth
                  size="medium"
                  type="text"
                  name="name"
                  label="name"
                  variant="outlined"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(errors.name && touched.name)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="Bio"
                  name="bio"
                  multiline
                  rows={2}
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={values.bio}
                  onChange={handleChange}
                  helperText={touched.bio && errors.bio}
                  error={Boolean(errors.bio && touched.bio)}
                  sx={{ mb: 3 }}
                />

                <PhoneInput
                  // inputStyle={{ width: "100%" }}
                  // dropdownStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%", paddingLeft: "50px" }}
                  dropdownStyle={{ width: "230px" }}
                  country={"in"}
                  value={contactNumber}
                  countryCodeEditable={false}
                  onChange={(phone) => {
                    setContactNumber(phone);
                  }}
                  // sx={{ mt: 2 }}
                />

                <Grid
                  item
                  display={"flex"}
                  justifyContent={"end"}
                  gap={1}
                  sx={{ mt: 3 }}
                >
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                  >
                    Update
                  </LoadingButton>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
    // </JWTRegister>
  );
}

export default function Profile() {
  return (
    <Container>
      <Stack spacing={3}>
        <SimpleCard title="Update Profile">
          <Index />
        </SimpleCard>
      </Stack>
    </Container>
  );
}
