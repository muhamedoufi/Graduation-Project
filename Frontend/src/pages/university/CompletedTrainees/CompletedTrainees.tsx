import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import {
    DataGrid,
    GridPagination,
    GridToolbar,
    gridClasses,
    gridPageCountSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import EvaluStepper from './components/EvaluStepper';
import './CompletedTrainees.css';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PrintIcon from '@mui/icons-material/Print';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import { getCompletedTrainees } from './api';
import theme from 'src/styling/customTheme';
import Typography from '@mui/material/Typography';
import Transition from 'src/components/Transition';
import DataGridPagination from 'src/components/DataGrid/DataGridPagination';
import useCompletedTraineesController from './hooks/useCompletedTraineesController';

interface Row {
    studentId: string;
    Student: {
        name: string;
    };
    count: string;
}

const CompletedTrainees: React.FC = () => {
    const {
        columns,
        rows,
        isOpen,
        data,
        currentTab,
        index,
        studentId,
        handleChangeTab,
        handleCloseDialog,
    } = useCompletedTraineesController();

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
                    <Typography component="h1" variant="h5" fontWeight={500}>
                        Completed Trainees
                    </Typography>
                    <DataGrid
                        className="dataGrid"
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
                        getRowId={(row) => row['studentId']}
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
            <Dialog
                open={isOpen}
                onClose={handleCloseDialog}
                fullScreen
                TransitionComponent={Transition}
                sx={{ left: '50%' }}
            >
                <DialogTitle gap={1.5} sx={{ textAlign: 'center' }}></DialogTitle>
                <DialogContent>
                    <EvaluStepper />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CompletedTrainees;
