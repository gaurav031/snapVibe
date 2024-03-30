import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import logo from "../../Image/snapvibe.png"  // Corrected file extension from .ong to .png

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="1x"
        backgroundColor={theme.palette.background.alt}
        p="1rem 10%"
        textAlign="center"
      >
        {/* Display the logo image */}
        <img src={logo} alt="SnapVibe Logo" style={{ width: "30%" }}/>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SnapVibe, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
