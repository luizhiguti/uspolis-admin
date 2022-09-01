import {
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
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
import JupiterCrawlerPopover from 'components/classes/jupiterCrawler.popover';
import Dialog from 'components/common/dialog.component';
import Navbar from 'components/common/navbar.component';
import Class from 'models/class.model';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ClassesService from 'services/classes.service';
import { Capitalize } from 'utils/formatters';

function Classes() {
  const [classesList, setClassesList] = useState<Array<Class>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState<Class>();

  const tableHeader = [
    { name: 'Código' },
    { name: 'Disciplina' },
    { name: 'Turma' },
    { name: 'Professores' },
    { name: 'Horários' },
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
    if (selectedClass) classesService.delete(selectedClass.subject_code, selectedClass.class_code);
  }

  return (
    <>
      <Navbar />
      <Center>
        <Box p={4} w='7xl' overflow='auto'>
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
          <TableContainer border='1px' borderRadius='lg' borderColor='blueviolet'>
            <Table>
              <Thead>
                <Tr>
                  {tableHeader.map((it) => (
                    <Th key={it.name}>{it.name}</Th>
                  ))}
                  <Td />
                </Tr>
              </Thead>
              <Tbody>
                {classesList.map((it) => (
                  <Tr key={it.class_code + it.subject_code}>
                    <Td>{it.subject_code}</Td>
                    <Td>{it.subject_name}</Td>
                    <Td>{it.class_code}</Td>
                    <Td>
                      <Box>
                        {it.professors?.map((professor) => (
                          <Text>{professor}</Text>
                        ))}
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        {it.week_days?.map((day, index) => (
                          <Text key={day}>{`${Capitalize(day)} ${it.start_time[index]} - ${it.end_time[0]}`} </Text>
                        ))}
                      </Box>
                    </Td>
                    <Td isNumeric>
                      <IconButton
                        aria-label='Delete class'
                        icon={<Icon as={FaTrash} />}
                        size='sm'
                        variant='ghost'
                        colorScheme='red'
                        onClick={() => handleDeleteClick(it)}
                      />
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

export default Classes;
