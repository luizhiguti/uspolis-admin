import {
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ColumnDef, CellContext } from '@tanstack/react-table';
import JupiterCrawlerPopover from 'components/classes/jupiterCrawler.popover';
import DataTable from 'components/common/dataTable.component';
import Dialog from 'components/common/dialog.component';
import Navbar from 'components/common/navbar.component';
import Class from 'models/class.model';
import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import ClassesService from 'services/classes.service';
import { Capitalize } from 'utils/formatters';
import { FilterArray } from 'utils/tableFiltersFns';

function Classes() {
  const [classesList, setClassesList] = useState<Array<Class>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState<Class>();

  const columns: ColumnDef<Class>[] = [
    {
      accessorKey: 'subject_code',
      header: 'Código',
    },
    {
      accessorKey: 'subject_name',
      header: 'Disciplina',
    },
    {
      accessorKey: 'class_code',
      header: 'Turma',
    },
    {
      accessorKey: 'professors',
      header: 'Professores',
      cell: ({ row }) => (
        <Box>
          {row.original.professors?.map((professor) => (
            <Text key={professor}>{professor}</Text>
          ))}
        </Box>
      ),
      filterFn: FilterArray,
    },
    {
      accessorFn: (row) =>
        row.week_days?.map((day, index) => `${Capitalize(day)} ${row.start_time[index]} - ${row.end_time[index]}`),
      header: 'Horários',
      cell: (info) => (
        <Box>
          {(info.getValue() as string[]).map((it) => (
            <Text key={it}>{it}</Text>
          ))}
        </Box>
      ),
      filterFn: FilterArray,
    },
    {
      id: 'options',
      meta: { isNumeric: true },
      cell: ({ row }) => (
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<Icon as={FaEllipsisV} />} variant='ghost' />
          <MenuList>
            {/* <MenuItem onClick={() => handleEditClick(it)}>Editar</MenuItem> */}
            <MenuItem onClick={() => handlePreferencesClick(row.original)}>Preferências</MenuItem>
            <MenuItem onClick={() => handleDeleteClick(row.original)}>Deletar</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const classesService = new ClassesService();

  useEffect(() => {
    classesService.list().then((it) => {
      setClassesList(it.data);
    });
    // eslint-disable-next-line
  }, []);

  function handleDeleteClick(obj: Class) {
    setSelectedClass(obj);
    onOpen();
  }

  function handleDelete() {
    if (selectedClass) {
      classesService.delete(selectedClass.subject_code, selectedClass.class_code).then((it) => {
        console.log(it.data);
        onClose();
      });
    }
  }

  function handlePreferencesClick(obj: Class) {}

  return (
    <>
      <Navbar />
      <Center>
        <Box p={4} w='8xl' overflow='auto'>
          <Flex align='center'>
            <Text fontSize='4xl' mb={4}>
              Turmas
            </Text>
            <Spacer />
            <JupiterCrawlerPopover />
          </Flex>
          <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleDelete}
            title={`Deseja deletar ${selectedClass?.subject_code} - ${selectedClass?.class_code}`}
          />
          <DataTable data={classesList} columns={columns} />
        </Box>
      </Center>
    </>
  );
}

export default Classes;
