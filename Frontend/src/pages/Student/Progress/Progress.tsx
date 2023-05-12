import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import theme from 'src/styling/customTheme';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  TextField,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useSnackbar from 'src/hooks/useSnackbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Edit from '@mui/icons-material/Edit';
const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const Progress: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [open, setOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [note, setNote] = useState('');
  const [openAccordion, setOpenAccordion] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setOpenAccordion(false);

    // Your submission logic goes here
  };

  return (
    <>
      <>
        <>
          <Grid
            container
            sx={{
              p: 3,
              justifyContent: 'center',
              alignItems: 'center',
              height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
            }}
          >
            <Stack
              gap={1.5}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Typography component="h1" variant="h5" fontWeight={500}>
                Fill Progress
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3.5rem',

                  alignItems: 'center',
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3.5,
                    minWidth: { xs: '90%', sm: '60%', md: '30%' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'center', sm: 'flex-start' },
                      gap: 2,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          sx={{ width: '40%', height: '60%' }}
                          label="Start Date"
                          value={selectedStartDate}
                          onChange={(newValue) =>
                            setSelectedStartDate(newValue)
                          }
                        />
                        <DatePicker
                          sx={{ width: '40%', height: '60%' }}
                          label="End Date"
                          value={selectedEndDate}
                          onChange={(newValue) =>
                            setSelectedStartDate(newValue)
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                      required
                      id="outlined-required"
                      label="Note"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      sx={{ minWidth: '150px' }}
                    />

                    <Button
                      variant="contained"
                      sx={{
                        marginTop: 'auto',
                        marginLeft: 'auto',
                        background:
                          'linear-gradient(45deg, #004e64 30%, #25a18e 90%)',
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                </Paper>

                <Root>
                  <Divider>
                    <Chip
                      label="Rejected Progress"
                      sx={{
                        color: 'white',
                        background:
                          // '#004e64'
                          'linear-gradient(45deg, #850000 30%, #DC0000 90%)',
                      }}
                    />
                  </Divider>
                </Root>
                <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'center', sm: 'flex-start' },
    gap: 2,
  }}
>
  <Box sx={{ width: '100%' }}>
    <Card
      sx={{
        borderLeft: '5px solid',
       borderColor:'#004e64',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              disabled
              sx={{ width: '40%', height: '60%' }}
              label="Start Date"
              value={selectedStartDate}
              onChange={(newValue) => setSelectedStartDate(newValue)}
            />
            <DatePicker
              disabled
              sx={{ width: '40%', height: '60%' }}
              label="End Date"
              value={selectedEndDate}
              onChange={(newValue) => setSelectedEndDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <IconButton sx={{ alignSelf: 'flex-end' }}>
          <Edit sx={{color:'#004e64'}}/>
        </IconButton>
      </CardContent>
    </Card>
  </Box>
</Box>

              </Box>
            </Stack>
          </Grid>
        </>
      </>
    </>
  );
};
export default Progress;