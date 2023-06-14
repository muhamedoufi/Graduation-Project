import { Chip, IconButton } from '@mui/material';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { createDataGrid } from 'src/components/DataGridTanstack';
import { Feed } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { progressForm } from 'src/api/progress';
import ProgressFormCell from '../CurrentTraineesV2/ProgressFormCell';
import { PageChangeParams } from 'src/components/DataGridTanstack/types';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { getBranch } from 'src/api/getBranch';
import { AddCompanyData, GetCompanyData } from './api/response.dto';
import useSnackbar from 'src/hooks/useSnackbar';
import { addBranch } from './api';

interface Branch {
    map(arg0: (company: any) => { id: any; location: any }): unknown;
    id: string;
    location: string;
  }
  
const uselogic = () => {
    const [companyName, setCompanyName] = useState('');
    const [showBranches, setShowBranches] = useState<boolean>(false);
    const [companyId, setCompanyId] = useState('');
    const [addBranchDiolog, setAddBranchDiolog] = useState(false);
    const [location, setLocation] = useState('');
    const [availableBranches, setAvailableBranches] = useState<Branch[]>([]);
    const { showSnackbar } = useSnackbar();
    const handleshowBranchesClose = () => {
        setShowBranches(false);
      };
    
      const handleAddBranchDialogOpen = () => {
        setAddBranchDiolog(true);
      };
    
      const handleAddBranchDialogClose = () => {
        setAddBranchDiolog(false);
        setShowBranches(false);
      };
    
      const handleAddBranch = () => {
        addBranch({ id: companyId, location: location }).then(
          (res: { success: boolean; message: any }) => {
            if (res.success === true) {
              showSnackbar({ severity: 'success', message: res.message });
              setLocation('');
              handleAddBranchDialogClose();
            } else if (res.success === false) {
              showSnackbar({ severity: 'warning', message: res.message });
              setLocation('');
              handleAddBranchDialogClose();
            }
          }
        );
      };
    const handleShowBranchesOpen = (id: string, name: string) => {
        setCompanyName(name);
        setCompanyId(id);
        console.log(id);
        console.log(companyId);
        console.log(companyName);
        setShowBranches(true);
        getBranch({ companyId: id }).then((res) => {
          if (res.success === true) {
            setAvailableBranches(res.data);
          } else if (res.success === false) {
            showSnackbar({ severity: 'warning', message: res.message });
          }
        });
      };
  const [isOpen, setIsOpen] = useState(false);
  const [trainingId, setTrainingId] = useState('');
  const [response, setReponse] = useState<Response>();
 
  

  const handleOpenDialog = (id: string) => {
    setTrainingId(id);
    console.log(trainingId);
    console.log(isOpen);
    setIsOpen((prev) => !prev);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setTrainingId('');
  };

  const columns: ColumnDef<GetCompanyData, any>[] = [
    {
      accessorKey: 'id',
      header: 'Company Id',
    },
    {
      accessorKey: 'name',
      header: 'Company Name',
      filterFn: 'arrIncludesSome',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        filterFn: 'arrIncludesSome',
      },
      {
        accessorKey: 'managerName',
        header: 'Manager Name',
        filterFn: 'arrIncludesSome',
      },
  
    {
      header: 'Branches',
      //@ts-ignore
      cell: (params: { row: AddCompanyData }) => {
        const com = params.row.name;
        console.log(com);
        return (
          <IconButton
            sx={{ ml: 1.5 }}
            aria-label="progress form"
            onClick={() => handleShowBranchesOpen(params.row.id, com)}
          >
            <AddBusinessIcon sx={{ color: '#820000' }} />
          </IconButton>
        );
      },
    },
  ];

  const CompaniesDataGrid = createDataGrid({
    name: 'CompaniesDataGrid',
    columns,
    shouldFlexGrowCells: true,
  });

  return {
   CompaniesDataGrid,
   handleAddBranch,
   handleAddBranchDialogClose,
   handleAddBranchDialogOpen,
   handleCloseDialog,
   handleOpenDialog,
   handleShowBranchesOpen,
   handleshowBranchesClose,
   availableBranches,
   companyName,
   companyId,
   addBranchDiolog,
  };
};
export default uselogic;
