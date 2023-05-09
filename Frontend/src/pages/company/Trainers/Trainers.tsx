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
import { getField } from 'src/api/getfield';
import ClearIcon from '@mui/icons-material/Clear';
import { addTrainerRequest } from 'src/addTrainer';
import { getTrainers } from './api';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTrianer } from 'src/DeleteTrainer';
import theme from 'src/styling/customTheme';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { validationSchema } from './schema';
import { INITIAL_FORM_STATE } from './constants';
import { AxiosBaseError } from 'src/types';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import extractErrorMessage from 'src/utils/extractErrorMessage';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TableCell,
  TextField,
  Typography,
} from '@mui/material';
import useSnackbar from 'src/hooks/useSnackbar';
import { updateTrianer } from 'src/EditTrainer';
import { Email } from '@mui/icons-material';
import useAddTrainerFormController from './hooks/useAddTrainerController';
import TextFieldWrapper from 'src/components/FormsUI/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
interface Row {
  id: string;
  companyId: string;
  fieldId: string;
  Field: {
    id: string;
    field: string;
  };
  name: string;
  status: string;
  userId: string;
}

const AddTrainerQueryKey = ['addTrainerRequest'];

const Trainers: React.FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const { showSnackbar } = useSnackbar();
  const [deleteId, setDeleteId] = useState<string>('');
  const [updateId, setUpdateId] = useState<string>('');
  const [updateField, setUpdeteField] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [name, setName] = useState<string>('');
  const [field, setField] = useState<string>('');
  const [trainerId, setTrainerId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fieldOptions, setFieldOptions] = useState<FieldOption[]>([]);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const { formikProps, isLoading, updatedata } = useAddTrainerFormController();

  interface FieldOption {
    map(arg0: (field: any) => { id: any; field: any }): unknown;
    id: string;
    fieldId: string;
    companyId: string;
    Field: {
      id: string;
      field: string;
    };
  }

  const { isValid } = formikProps;

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    getTrainers()
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, [updatedata]);

  useEffect(() => {
    getField().then((res) => {
      if (res.success) {
        console.log(res.data);
        const options = res.data.map((field) => ({
          id: field.id,
          fieldId: field.Field.id,
          companyId: field.Field.field,
          Field: field.Field,
        })) as FieldOption[];
        setFieldOptions(options);
        console.log(fieldOptions);
      }
    });
  }, []);

  const handleDeleteRequest = () => {
    deleteTrianer({ id: deleteId }).then(
      (res: { success: boolean; message: any }) => {
        if (res.success === true) {
          showSnackbar({ severity: 'success', message: res.message });
          setData((prevData) => prevData.filter((row) => row.id !== deleteId));
          setDeleteId('');
          setConfirmDialogOpen(false);
        } else if (res.success === false) {
          showSnackbar({ severity: 'warning', message: res.message });
          setDeleteId('');
          setConfirmDialogOpen(false);
        }
      }
    );
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openA, setOpenA] = useState(false);

  const handleAddClick = () => {
    setOpenA(true);
  };

  const handleAddCancel = () => {
    setOpenA(false);
  };

  const handleOpen = (id: string) => {
    setUpdateId(id);
    setOpenUpdate(true);
  };

  const handleClose = () => {
    setOpenUpdate(false);
  };

  const handleSave = () => {
    updateTrianer({ id: updateId, fieldId: updateField }).then((res) => {
      console.log(updateId);
      console.log(updateField);
      if (res.success === true) {
        const fieldName = res.data.Field.field;
        showSnackbar({ severity: 'success', message: res.message });
        setData((prevData) =>
          prevData.map((row) => {
            if (row.id === updateId) {
              return {
                ...row,
                Field: {
                  ...row.Field,
                  field: fieldName,
                },
              };
            }
            return row;
          })
        );
        setUpdateId('');
        // setUpdateField(null);
        setOpenUpdate(false);
      } else if (res.success === false) {
        showSnackbar({ severity: 'warning', message: res.message });
        setUpdateId('');
        // setUpdateField(null);
        setOpenUpdate(false);
      }
    });
    console.log(`New value: ${updateField}`);
    console.log(`Training ID : ${updateId}`);
    handleClose();
  };

  // const handleValueChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setUpdateField(event.target.value);
  // };

  const columns = [
    { field: 'id', headerName: 'Trainer Id', width: 220, flex: 0.3 },
    { field: 'name', headerName: 'Trianer Name', width: 220, flex: 0.3 },
    { field: 'field', headerName: 'field', width: 220, flex: 0.3 },
    {
      field: 'editField',
      headerName: 'Edit Field',
      flex: 0.3,
      width: 220,
      headerClassName: 'ctrainees',
      filterable: false,
      sortable: false,
      renderCell: (params: { id: any }) => (
        <>
          <IconButton
            onClick={() => handleOpen(params.id)}
            aria-label="edit field"
          >
            <EditIcon sx={{ color: '#820000' }} className="edit-icon" />
          </IconButton>
          <Dialog
            fullWidth
            className="dialog-box"
            open={openUpdate}
            onClose={handleClose}
            BackdropProps={{ invisible: true }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Field</DialogTitle>
            <DialogContent>
              <Autocomplete
                id="field"
                options={fieldOptions}
                getOptionLabel={(option) => option.Field.field}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Field"
                    variant="outlined"
                  />
                )}
                onChange={(event, newValue) => {
                  formikProps.setFieldValue('fieldId', newValue?.id || '');
                  setUpdeteField(newValue?.id || '');
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },

    {
      field: 'delete',
      headerName: 'Delete Trainer',
      sortable: false,
      width: 220,
      filterable: false,
      alignContent: 'centre',
      renderCell: (params: { [x: string]: any; id: any }) => (
        <>
          <IconButton
            sx={{ ml: 3.5 }}
            color="error"
            aria-label="delete trianer"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            <ClearIcon className="clear" />
          </IconButton>
          <Dialog
            open={confirmDialogOpen}
            onClose={handleDeleteCancel}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Delete Trainer</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this trainer?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteRequest}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];

  const rows = data.map((row) => ({
    id: row.id,
    name: row.name,
    field: row.Field.field,
    status: row.status,
    companyId: row.companyId,
    userId: row.userId,
  }));

  return (
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
                            <TextFieldWrapper
                              label="Trainer Name"
                              name="name"
                            />
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
                                  setField(newValue?.id || '');
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
                pagination: CustomPagination,
              }}
            />
          </Stack>
        </Grid>
      </>
    </>
  );
};

export default Trainers;
