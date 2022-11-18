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
  Select,
} from '@chakra-ui/react';
import { Preferences } from 'models/class.model';
import { Buildings } from 'models/enums/buildings.enum';

import { useEffect, useState } from 'react';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: Preferences; // data from database
  onSave: (data: Preferences) => void;
}

export default function PreferencesModal(props: PreferencesModalProps) {
  const buildingsOptions = Object.values(Buildings);

  const initialForm: Preferences = {
    building: Buildings.BIENIO,
    required: true,
  };

  const [form, setForm] = useState(props.formData ?? initialForm);

  useEffect(() => {
    // set data from database
    if (props.formData) setForm(props.formData);
  }, [props.formData]);

  function handleSaveClick() {
    if (isEmpty(form.building)) return;

    props.onSave(form);
    props.onClose();
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

          <FormControl mt={4}>
            <Checkbox
              isChecked={form.required}
              onChange={(event) => setForm((prev) => ({ ...prev, required: event.target.checked }))}
            >
              Turma deve ser alocada obrigatoriamente
            </Checkbox>
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
