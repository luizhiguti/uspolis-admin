import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useCheckboxGroup,
} from '@chakra-ui/react';
import { EventByClassrooms } from 'models/event.model';
import { useEffect, useState } from 'react';
import ClassroomsService from 'services/classrooms.service';
import EventsService from 'services/events.service';
import { Capitalize } from 'utils/formatters';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  classEvents: EventByClassrooms[];
}

export default function EditEventModal({ isOpen, onClose, classEvents }: EditEventModalProps) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const { value, setValue, getCheckboxProps } = useCheckboxGroup();
  const [availableClassrooms, setAvailableClassrooms] = useState<string[]>([]);
  const [availableClassroomsByEvent, setAvailableClassroomsByEvent] = useState<Map<string, string[]>>();
  const [newClassroom, setNewClassroom] = useState('');

  const classroomsService = new ClassroomsService();
  const eventsService = new EventsService();

  const classData = classEvents[0];

  useEffect(() => {
    const _weekDays = classEvents.map((it) => it.weekday);
    setValue(_weekDays);
    setWeekDays(_weekDays);
    const availableByEvent = new Map<string, string[]>();
    const available: string[][] = [];
    const promises = classEvents.map((cl) => classroomsService.getAvailable(cl.weekday, cl.startTime, cl.endTime));

    Promise.all(promises).then((values) => {
      values.forEach((it, index) => {
        availableByEvent.set(_weekDays[index], it.data);
        available.push(it.data);
      });
      setAvailableClassroomsByEvent(availableByEvent);
      const intersection = available.length ? available.reduce((p, c) => p.filter((e) => c.includes(e))) : [];
      setAvailableClassrooms(intersection);
    });

    // eslint-disable-next-line
  }, [classEvents]);

  useEffect(() => {
    const available: string[][] = [];
    availableClassroomsByEvent?.forEach((classrooms, weekDay) => {
      if (value.includes(weekDay)) available.push(classrooms);
    });

    const intersection = available.length ? available.reduce((p, c) => p.filter((e) => c.includes(e))) : [];
    setAvailableClassrooms(intersection);
    setNewClassroom('');
    // eslint-disable-next-line
  }, [value]);

  function handleSaveClick() {
    eventsService.edit(classData.subjectCode, classData.classCode, value as string[], newClassroom).then((it) => {
      console.log(it.data);
      onClose();
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Editar alocação - {classData?.subjectCode}
          <Text fontSize='md' fontWeight='normal'>
            {classData?.classCode} - {classData?.professor}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody px={6}>
          <Checkbox
            isChecked={value.length === weekDays.length}
            onChange={(e) => (e.target.checked ? setValue(weekDays) : setValue([]))}
          >
            Todos os horários
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {classEvents.map((it, index) => {
              return (
                <Checkbox key={index} {...getCheckboxProps({ value: it.weekday })}>
                  {Capitalize(it.weekday)} - {it.startTime} {it.endTime}
                </Checkbox>
              );
            })}
          </Stack>

          <FormControl my={4}>
            <FormLabel>Salas disponíveis</FormLabel>
            <Select
              placeholder='Selecione'
              value={newClassroom}
              onChange={(event) => setNewClassroom(event.target.value)}
            >
              {availableClassrooms.map((it) => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={2} onClick={handleSaveClick} isDisabled={!newClassroom}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
