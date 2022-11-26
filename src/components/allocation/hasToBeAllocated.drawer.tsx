import {
  Button,
  chakra,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import Class, { HasToBeAllocatedClass } from 'models/class.model';
import { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

interface HasToBeAllocatedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  classesList?: Class[];
  onSave: (data: HasToBeAllocatedClass[]) => void;
}

export default function HasToBeAllocatedDrawer({ isOpen, onClose, classesList, onSave }: HasToBeAllocatedDrawerProps) {
  const [hasToBeAllocatedClasses, setHasToBeAllocatedClasses] = useState<HasToBeAllocatedClass[]>();

  useEffect(() => {
    if (classesList) {
      setHasToBeAllocatedClasses(
        classesList
          .map(({ class_code, subject_code, has_to_be_allocated, professors }) => ({
            subject_code,
            class_code,
            has_to_be_allocated,
            professors: [...new Set(professors)],
          }))
          .sort(sortBySobjectAndClassCode),
      );
    }
  }, [classesList]);

  function sortBySobjectAndClassCode(a: HasToBeAllocatedClass, b: HasToBeAllocatedClass) {
    const compareSubjectCode = a.subject_code.localeCompare(b.subject_code);

    // same class code
    if (compareSubjectCode === 0) return a.class_code.localeCompare(b.class_code);
    return compareSubjectCode;
  }

  function handleAlloc() {
    if (hasToBeAllocatedClasses) onSave(hasToBeAllocatedClasses);
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='sm'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Alocação impossível
          <Text fontSize='md' fontWeight='normal'>
            Não foi possível alocar todas as turmas, selecione turmas menos prioritárias que não precisam ser alocadas
            no prédio em questão e tente novamente
          </Text>
        </DrawerHeader>
        <DrawerBody>
          <FormControl>
            <FormLabel>Turmas alocadas obrigatoriamente</FormLabel>
            <Stack>
              {hasToBeAllocatedClasses?.map((cls, index) => (
                <HStack spacing={4}>
                  <Checkbox
                    key={index}
                    isChecked={cls.has_to_be_allocated}
                    onChange={(event) =>
                      setHasToBeAllocatedClasses(
                        hasToBeAllocatedClasses
                          .map((cl, idx) => (index === idx ? { ...cl, has_to_be_allocated: event.target.checked } : cl))
                          .sort(sortBySobjectAndClassCode),
                      )
                    }
                  >
                    {cls.subject_code} - {cls.class_code}
                  </Checkbox>
                  <Tooltip label={cls.professors?.toString()} placement='bottom-end' hasArrow>
                    <chakra.span>
                      <FaGraduationCap />
                    </chakra.span>
                  </Tooltip>
                </HStack>
              ))}
            </Stack>
          </FormControl>
        </DrawerBody>
        <DrawerFooter>
          <Button colorScheme='blue' mr={3} onClick={handleAlloc}>
            Alocar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}