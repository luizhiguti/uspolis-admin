import { useEffect, useState } from 'react';
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ClassroomsService } from 'services/classrooms.service';
import { Classroom } from 'models/classroom.model';

function Classrooms() {
  const classroomService = new ClassroomsService();

  const [classroomsList, setClassroomsList] = useState<Array<Classroom>>();

  useEffect(() => {
    classroomService.list().then((it) => setClassroomsList(it.data));
  }, []);

  return (
    <TableContainer maxW='sm' m='2' border='1px' borderRadius='lg' borderColor='blueviolet'>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
          </Tr>
        </Thead>
        <Tbody>
          {classroomsList?.map((it) => (
            <Tr>
              <Td>{it.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Classrooms;
