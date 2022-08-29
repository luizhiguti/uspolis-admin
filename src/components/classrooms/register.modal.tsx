import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ClassroomsService from 'services/classrooms.service';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: any;
  isUpdate: boolean;
}

export default function RegisterModal(props: RegisterModalProps) {
  const classroomService = new ClassroomsService();

  const initialForm = {
    classroom_name: '',
    building: '',
    floor: 0,
    capacity: 0,
    air_conditioning: false,
    projector: false,
    accessibility: false,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (props.formData) setForm(props.formData);
  }, [props.formData]);

  function handleSaveClick() {
    if (props.isUpdate) {
      classroomService.update(form.classroom_name, form).then((it) => {
        setForm(initialForm);
        props.onClose();
      });
    } else {
      classroomService.create(form).then((it) => {
        setForm(initialForm);
        props.onClose();
      });
    }
  }

  function handleCloseModal() {
    setForm(initialForm);
    props.onClose();
  }

  function isRequired(value: string) {
    return value.length <= 0;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar uma sala</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              placeholder='Nome'
              value={form.classroom_name}
              isInvalid={isRequired(form.classroom_name)}
              onChange={(event) => setForm((prev) => ({ ...prev, classroom_name: event.target.value }))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Prédio</FormLabel>
            <Input
              placeholder='Prédio'
              value={form.building}
              onChange={(event) => setForm((prev) => ({ ...prev, building: event.target.value }))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Andar</FormLabel>
            <NumberInput
              placeholder='Andar'
              value={form.floor}
              onChange={(_, value) => setForm((prev) => ({ ...prev, floor: isNaN(value) ? 0 : value }))}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Capacidade</FormLabel>
            <NumberInput
              placeholder='Capacidade'
              value={form.capacity}
              onChange={(_, value) => setForm((prev) => ({ ...prev, capacity: isNaN(value) ? 0 : value }))}
              min={0}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <Checkbox
                isChecked={form.accessibility}
                onChange={(event) => setForm((prev) => ({ ...prev, accessibility: event.target.checked }))}
              >
                Acessibilidade
              </Checkbox>
              <Checkbox
                isChecked={form.air_conditioning}
                onChange={(event) => setForm((prev) => ({ ...prev, air_conditioning: event.target.checked }))}
              >
                Ar Condicionado
              </Checkbox>
              <Checkbox
                isChecked={form.projector}
                onChange={(event) => setForm((prev) => ({ ...prev, projector: event.target.checked }))}
              >
                Projetor
              </Checkbox>
            </HStack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleSaveClick}>
            Save
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
