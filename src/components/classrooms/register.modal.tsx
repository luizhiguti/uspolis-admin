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
  Select,
} from '@chakra-ui/react';

// import { CreatableSelect, GroupBase } from 'chakra-react-select';
import { Buildings } from 'models/enums/buildings.enum';

import { useEffect, useState } from 'react';
import ClassroomsService from 'services/classrooms.service';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: any;
  isUpdate: boolean;
}

// interface LabelValueOptions {
//   label: string;
//   value: string;
// }

export default function RegisterModal(props: RegisterModalProps) {
  const classroomService = new ClassroomsService();
  // const buildingsOptions = Object.values(Buildings).map((it) => ({ label: it, value: it }));
  const buildingsOptions = Object.values(Buildings);

  const initialForm = {
    classroom_name: '',
    building: Buildings.BIENIO,
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
    if (isEmpty(form.classroom_name)) return;
    if (props.isUpdate) {
      classroomService.update(form.classroom_name, form).then((it) => {
        props.onClose();
      });
    } else {
      classroomService.create(form).then((it) => {
        props.onClose();
      });
    }
  }

  function handleCloseModal() {
    props.onClose();
  }

  function isEmpty(value: string) {
    return value.length <= 0;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.isUpdate ? 'Editar informações da sala' : 'Cadastrar uma sala'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={isEmpty(form.classroom_name)}>
            <FormLabel>Nome</FormLabel>
            <Input
              disabled={props.isUpdate}
              placeholder='Nome'
              value={form.classroom_name}
              onChange={(event) => setForm((prev) => ({ ...prev, classroom_name: event.target.value }))}
            />
          </FormControl>

          <FormControl mt={4} isInvalid={isEmpty(form.building)} isDisabled={props.isUpdate}>
            <FormLabel>Prédio</FormLabel>
            {/* <CreatableSelect<LabelValueOptions, false, GroupBase<LabelValueOptions>>
              id='buildings-select'
              options={buildingsOptions}
              closeMenuOnSelect
              isDisabled={props.isUpdate}
              placeholder='Prédio'
              defaultValue={{ label: form.building, value: form.building }}
              onChange={(option) => setForm((prev) => ({ ...prev, building: option?.value as Buildings }))}
              formatCreateLabel={(value) => `Novo prédio "${value}"`}
            /> */}
            <Select
              value={form.building}
              onChange={(event) => setForm((prev) => ({ ...prev, building: event.target.value as Buildings }))}
            >
              {buildingsOptions.map((it) => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
            </Select>
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
              <Checkbox
                isChecked={form.accessibility}
                onChange={(event) => setForm((prev) => ({ ...prev, accessibility: event.target.checked }))}
              >
                Acessibilidade
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
