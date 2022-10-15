import { Grid, GridItem, Text } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from 'components/common/dataTable.component';
import Navbar from 'components/common/navbar.component';
import { AllocationByWeekDays, ClassAllocation } from 'models/allocation.model';
import { useEffect, useState } from 'react';
import AllocationService from 'services/allocations.service';
import { AllocationByWeekDaysMapper } from 'utils/allocationDataHelpers';

function Allocations() {
  const [allocation, setAllocation] = useState<ClassAllocation[]>([]);
  const [tableData, setTableData] = useState<AllocationByWeekDays[]>([]);

  const columnsByWeekDays: ColumnDef<AllocationByWeekDays>[] = [
    {
      accessorKey: 'sunday',
      header: 'Segunda',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'tuesday',
      header: 'Terça',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'wednesday',
      header: 'Quarta',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'thursday',
      header: 'Quinta',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'friday',
      header: 'Sexta',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'saturday',
      header: 'Sábado',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'monday',
      header: 'Domingo',
      enableColumnFilter: false,
      enableSorting: false,
    },
  ];

  const allocationsService = new AllocationService();

  useEffect(() => {
    allocationsService.getById('id-teste').then((it) => {
      setAllocation(it.classes);
    });
  }, []);

  useEffect(() => {
    setTableData(AllocationByWeekDaysMapper(allocation));
    // ((AllocationByWeekDaysMapper(allocation)));
  }, [allocation]);

  return (
    <>
      <Navbar />
      <Grid
        templateAreas={`"header header"
                        "nav main"`}
        gridTemplateRows={'1 1fr'}
        gridTemplateColumns={'1 1fr'}
      >
        <GridItem p={4} area={'header'}>
          <Text fontSize='4xl'>Alocações</Text>
        </GridItem>
        <GridItem px='2' bg='pink.300' area={'nav'}>
          Nav
        </GridItem>
        <GridItem px='2' area={'main'}>
          <DataTable data={tableData} columns={columnsByWeekDays} />
        </GridItem>
      </Grid>
    </>
  );
}

export default Allocations;
