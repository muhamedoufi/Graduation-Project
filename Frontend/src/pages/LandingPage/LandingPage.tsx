import React, { FC } from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useLocation } from 'react-router-dom';

interface LandingProps {}

const LandingPage: FC<LandingProps> = (props) => {
    const location = useLocation();
    const isSuccess = location.search.includes('success');
    
  return (
      <Stack gap={2} sx={{alignItems: "center", justifyContent: "center", transform: "translateY(50%)"}}>
          <Typography variant="h1">
              LandingPage
          </Typography>
          <Typography variant="h3">
              Public Route 📢
          </Typography>
          <Typography variant="h4">
              anyone can access this page 🙂
          </Typography>
      </Stack>
  );
};

export default LandingPage;

