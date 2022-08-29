import { CheckIcon, CloseIcon, DragHandleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import RegisterModal from 'components/classrooms/register.modal';
import Navbar from 'components/common/navbar.component';
import Classroom from 'models/classroom.model';
import { SetStateAction, useEffect, useState } from 'react';
import ClassroomsService from 'services/classrooms.service';

function Classrooms() {
  const [classroomsList, setClassroomsList] = useState<Array<Classroom>>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [registerFormData, setRegisterFormData] = useState();
  const [update, setUpdate] = useState(false);

  const tableHeader = [
    { name: 'Nome' },
    { name: 'Prédio' },
    { name: 'Andar' },
    { name: 'Capacidade' },
    { name: 'Ar Condicionado' },
    { name: 'Projetor' },
    { name: 'Acessibilidade' },
    { name: 'Atualizado em' },
  ];

  const classroomService = new ClassroomsService();

  useEffect(() => {
    classroomService.list().then((it) => {
      setClassroomsList(it.data);
    });
    // eslint-disable-next-line
  }, [isOpen]);

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
      <Center>
        <Box p={4} maxW='1200px'>
          <Flex align='center'>
            <Text fontSize='4xl' mb={4}>
              Salas de aula
            </Text>
            <Spacer />
            <Button colorScheme='blue' onClick={handleCreateClick}>
              Cadastrar
            </Button>
            <RegisterModal isOpen={isOpen} onClose={onClose} formData={registerFormData} isUpdate={update} />
          </Flex>
          <TableContainer border='1px' borderRadius='lg' borderColor='blueviolet'>
            <Table>
              <Thead>
                <Tr>
                  {tableHeader?.map((it) => (
                    <Th key={it.name}>{it.name}</Th>
                  ))}
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {classroomsList?.map((it) => (
                  <Tr key={it.classroom_name + it.building}>
                    <Td>{it.classroom_name}</Td>
                    <Td>{it.building}</Td>
                    <Td>{it.floor}</Td>
                    <Td>{it.capacity}</Td>
                    <Td>{it.air_conditioning ? <CheckIcon /> : <CloseIcon />}</Td>
                    <Td>{it.projector ? <CheckIcon /> : <CloseIcon />}</Td>
                    <Td>{it.accessibility ? <CheckIcon /> : <CloseIcon />}</Td>
                    <Td>{it.updated_at}</Td>
                    <Td isNumeric>
                      <Menu>
                        <MenuButton as={IconButton} aria-label='Options' icon={<DragHandleIcon />} variant='ghost' />
                        <MenuList>
                          <MenuItem onClick={() => handleEditClick(it)}>Editar</MenuItem>
                          <MenuItem onClick={() => handleDeleteClick(it.classroom_name)}>Deletar</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </>
  );
}

export default Classrooms;
