import { useEffect, useState } from 'react';
import { Box, Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import ClassroomsService from 'services/classrooms.service';
import Classroom from 'models/classroom.model';
import Navbar from 'components/common/navbar.component';

function Classrooms() {
  const classroomService = new ClassroomsService();

  const [classroomsList, setClassroomsList] = useState<Array<Classroom>>();

  useEffect(() => {
    classroomService.list().then((it) => {
      setClassroomsList(it.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Box p={4}>
        <Text fontSize='4xl' mb={4}>
          Salas de aula
        </Text>
        <TableContainer maxW='sm' border='1px' borderRadius='lg' borderColor='blueviolet'>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
              </Tr>
            </Thead>
            <Tbody>
              {classroomsList?.map((it) => (
                <Tr>
                  <Td>{it.classroom}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Classrooms;
