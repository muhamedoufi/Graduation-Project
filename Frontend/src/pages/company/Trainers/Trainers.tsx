import React, { useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
  DataGrid,
  GridPagination,
  GridToolbar,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import RemoveIcon from '@mui/icons-material/Remove';
import './Trainers.css';
import {
  Autocomplete,
  Backdrop,
  Collapse,
  FormControl,
  Paper,
} from '@mui/material';
import { Form, FormikProvider } from 'formik';

import theme from 'src/styling/customTheme';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import useAllTrainersFormController from './hooks/useAllTrainersController';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';

const Trainers: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { formikProps, isLoading, columns, rows, fieldOptions } =
  useAllTrainersFormController();

  const { isValid } = formikProps;

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  return (
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
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography component="h1" variant="h5" fontWeight={500}>
              Trainers
            </Typography>

            <Button
              variant="contained"
              sx={{ width: 'auto' }}
              color={open ? 'error' : 'success'}
              onClick={handleChange}
              startIcon={open ? <RemoveIcon /> : <PersonAddIcon />}
            >
              {open ? 'Close' : 'Add Trainer'}
            </Button>
          </Stack>
          <Grid
            container
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack
              gap={0.5}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Collapse in={open}>
                <Paper
                  elevation={3}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3.5,
                    minWidth: { xs: '90%', sm: '60%', md: '30%' },
                  }}
                >
                  <FormikProvider value={formikProps}>
                    <Form>
                      <Stack spacing={1} gap={1} alignItems="center">
                        <Typography component="h1" variant="h5">
                          Add Trainer
                        </Typography>
                        <Stack gap={5} direction="row">
                          <TextFieldWrapper
                            label="Trainer Id"
                            name="id"
                            autoFocus
                          />
                          <TextFieldWrapper label="Trainer Name" name="name" />
                          <TextFieldWrapper
                            label="E-mail"
                            type="email"
                            name="email"
                          />
                          <TextFieldWrapper
                            label="Phone Number"
                            name="phoneNumber"
                          />
                          <FormControl fullWidth>
                            <Autocomplete
                              id="field"
                              options={fieldOptions}
                              getOptionLabel={(option) => option.Field.field}
                              onChange={(event, newValue) => {
                                formikProps.setFieldValue(
                                  'fieldId',
                                  newValue?.id || ''
                                );
                                // setField(newValue?.id || '');
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Field"
                                  variant="outlined"
                                />
                              )}
                            />
                          </FormControl>
                        </Stack>
                        <LoadingButton
                          type="submit"
                          // fullWidth
                          variant="contained"
                          disabled={!isValid}
                          loading={isLoading}
                        >
                          Generate Account
                        </LoadingButton>
                      </Stack>
                    </Form>
                  </FormikProvider>
                </Paper>
              </Collapse>
            </Stack>
          </Grid>
          <DataGrid
            sx={{
              boxShadow: 10,
              border: 1,
              borderColor: '#cacaca',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            columns={columns}
            rows={rows}
            getRowId={(row) => row['id']}
            initialState={{
              pagination: { paginationModel: { pageSize: 30 } },
            }}
            pageSizeOptions={[10, 20, 30]}
            slots={{
              toolbar: GridToolbar,
              pagination: DataGridPagination,
            }}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default Trainers;
