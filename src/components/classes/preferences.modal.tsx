import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
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
import { CreatableSelect, GroupBase, OptionBase, PropsValue } from 'chakra-react-select';
import { Buildings } from 'models/enums/buildings.enum';

import { useEffect, useState } from 'react';
import ClassesService from 'services/classes.service';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: any; // data from database
  subjectCode: string;
  classCode: string;
}

interface LabelValueOptions extends OptionBase {
  label: string;
  value: string;
}

export default function PreferencesModal(props: PreferencesModalProps) {
  const buildingsOptions = Object.values(Buildings).map((it) => ({ label: it, value: it }));
  const classesService = new ClassesService();

  const initialForm = {
    building: '',
    capacity: 0,
    air_conditioning: false,
    projector: false,
    accessibility: false,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    // set data from database
    if (props.formData) setForm(props.formData);
  }, [props.formData]);

  function handleSaveClick() {
    if (isEmpty(form.building)) return;
    classesService.patchPreferences(props.subjectCode, props.classCode, form).then((it) => {
      console.log(it);
      props.onClose();
    });
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
        <ModalHeader>Preferências</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isInvalid={isEmpty(form.building)}>
            <FormLabel>Prédio</FormLabel>
            <CreatableSelect<LabelValueOptions, false, GroupBase<LabelValueOptions>>
              id='buildings-select'
              options={buildingsOptions}
              closeMenuOnSelect
              placeholder='Prédio'
              defaultValue={{ label: form.building, value: form.building }}
              onChange={(option) => setForm((prev) => ({ ...prev, building: option?.value as Buildings }))}
              formatCreateLabel={(value) => `Novo prédio "${value}"`}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Capacidade mínima</FormLabel>
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
