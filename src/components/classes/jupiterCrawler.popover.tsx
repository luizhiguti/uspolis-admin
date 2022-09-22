import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import ClassesService from 'services/classes.service';

interface JupiterCrawlerPopoverPrpos {
  subjects?: string[];
}

export default function JupiterCrawlerPopover({ subjects = [] }: JupiterCrawlerPopoverPrpos) {
  const [subjectsList, setSubjectsList] = useState(subjects);
  const [subjectInput, setSubjectInput] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const classesService = new ClassesService();

  function handleAddClick() {
    if (subjectInput.length > 0 && !subjectsList.includes(subjectInput))
      setSubjectsList((prev) => [...prev, subjectInput]);

    setSubjectInput('');
  }

  function handleCleanClick() {
    setSubjectsList([]);
  }

  function handleConfirmClick() {
    classesService.createMany(subjectsList).then((it) => {
      console.log(it);
      onClose();
    });
  }

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button colorScheme='blue'>Atualizar com Júpiter</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Disciplinas</PopoverHeader>
        <PopoverBody maxH='2xs' overflowY='auto'>
          <InputGroup>
            <Input
              value={subjectInput}
              onChange={(event) => setSubjectInput(event.target.value)}
              placeholder='Código da disciplina'
            />
            <InputRightElement>
              <IconButton
                aria-label='Add subbject'
                size='sm'
                colorScheme='cyan'
                icon={<AddIcon />}
                onClick={handleAddClick}
              />
            </InputRightElement>
          </InputGroup>
          <UnorderedList p={2}>
            {subjectsList.map((it) => (
              <ListItem key={it}>{it}</ListItem>
            ))}
          </UnorderedList>
        </PopoverBody>
        {subjectsList.length > 0 && (
          <PopoverFooter>
            <Flex>
              <Button colorScheme='yellow' size='sm' variant='outline' onClick={handleCleanClick}>
                Limpar
              </Button>
              <Spacer />
              <Button colorScheme='blue' size='sm' variant='outline' onClick={handleConfirmClick}>
                Confirmar
              </Button>
            </Flex>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
}
