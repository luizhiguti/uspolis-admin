import {
  Box,
  Button,
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
import { ColumnDef } from '@tanstack/react-table';
import RegisterModal from 'components/classrooms/register.modal';
import DataTable from 'components/common/dataTable.component';
import Navbar from 'components/common/navbar.component';
import Classroom from 'models/classroom.model';
import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import ClassroomsService from 'services/classrooms.service';
import { FilterBoolean, FilterNumber } from 'utils/tanstackTableHelpers/tableFiltersFns';

function Classrooms() {
  const [classroomsList, setClassroomsList] = useState<Array<Classroom>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [registerFormData, setRegisterFormData] = useState();
  const [update, setUpdate] = useState(false);

  const columns: ColumnDef<Classroom>[] = [
    {
      accessorKey: 'classroom_name',
      header: 'Nome',
    },
    {
      accessorKey: 'building',
      header: 'Prédio',
      meta: { isSelectable: true },
    },
    {
      accessorKey: 'floor',
      header: 'Andar',
      meta: { isSelectable: true },
      filterFn: FilterNumber,
    },
    {
      accessorKey: 'capacity',
      header: 'Capacidade',
      meta: { isSelectable: true },
      filterFn: FilterNumber,
    },
    {
      accessorKey: 'air_conditioning',
      header: 'Ar condicionado',
      meta: { isBoolean: true, isSelectable: true },
      filterFn: FilterBoolean,
    },
    {
      accessorKey: 'projector',
      header: 'Projetor',
      meta: { isBoolean: true, isSelectable: true },
      filterFn: FilterBoolean,
    },
    {
      accessorKey: 'accessibility',
      header: 'Acessibilidade',
      meta: { isBoolean: true, isSelectable: true },
      filterFn: FilterBoolean,
    },
    {
      accessorKey: 'updated_at',
      header: 'Atualizado em',
    },
    {
      id: 'options',
      meta: { isNumeric: true },
      cell: ({ row }) => (
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<Icon as={FaEllipsisV} />} variant='ghost' />
          <MenuList>
            <MenuItem onClick={() => handleEditClick(row.original)}>Editar</MenuItem>
            <MenuItem onClick={() => handleDeleteClick(row.original.classroom_name)}>Deletar</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const classroomService = new ClassroomsService();

  useEffect(() => {
    classroomService.list().then((it) => {
      setClassroomsList(it.data);
    });
    console.log('useeffect');
    // eslint-disable-next-line
  }, []);

  function handleDeleteClick(name: string) {
    classroomService.delete(name).then((it) => console.log(it.data));
  }

  function handleEditClick(data: any) {
    setRegisterFormData(data);
    setUpdate(true);
    onOpen();
  }

  function handleCreateClick() {
    setUpdate(false);
    onOpen();
  }

  return (
    <>
      <Navbar />
      <RegisterModal isOpen={isOpen} onClose={onClose} formData={registerFormData} isUpdate={update} />
      <Center>
        <Box p={4} w='7xl' overflowX='auto'>
          <Flex align='center'>
            <Text fontSize='4xl' mb={4}>
              Salas de aula
            </Text>
            <Spacer />
            <Button colorScheme='blue' onClick={handleCreateClick}>
              Cadastrar
            </Button>
          </Flex>
          <DataTable data={classroomsList} columns={columns} />
        </Box>
      </Center>
    </>
  );
}

export default Classrooms;
