import { Grid, GridItem, Text } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import EventContent from 'components/allocations/eventContent';
import Navbar from 'components/common/navbar.component';
import { useEffect, useState } from 'react';
import AllocationService from 'services/allocations.service';
import { AllocationEventsMapper, AllocationResourcesFromEventsMapper } from 'utils/mappers/allocations.mapper';

function Allocations() {
  const [allocation, setAllocation] = useState<any[]>([]);
  const [resources, setResources] = useState<{ id: string }[]>();

  const allocationsService = new AllocationService();

  useEffect(() => {
    Promise.all([allocationsService.getById('id-teste')]).then((values) => {
      setAllocation(AllocationEventsMapper(values[0]));
      setResources(AllocationResourcesFromEventsMapper(values[0]));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Grid
        templateAreas={`"header"
                        "main"`}
        gridTemplateRows={'1 1fr'}
        gridTemplateColumns={'1fr'}
      >
        <GridItem p={4} area={'header'}>
          <Text fontSize='4xl'>Alocações</Text>
        </GridItem>
        <GridItem px='2' pb='2' area={'main'}>
          <FullCalendar
            schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
            plugins={[timeGridPlugin, resourceTimelinePlugin]}
            initialView='timeGridWeek'
            views={{
              timeGridWeek: {
                slotLabelFormat: { hour: '2-digit', minute: '2-digit' },
                eventMaxStack: 1,
                titleFormat: { year: 'numeric', month: 'long' },
              },
              resourceTimelineDay: {
                slotDuration: '01:00',
                slotLabelFormat: { hour: '2-digit', minute: '2-digit' },
                eventTimeFormat: { hour: '2-digit', minute: '2-digit' },
              },
              resourceTimelineWeek: {
                slotDuration: '01:00',
                slotLabelFormat: [
                  { weekday: 'short', day: '2-digit', month: '2-digit', omitCommas: true },
                  { hour: '2-digit', minute: '2-digit' },
                ],
                titleFormat: { year: 'numeric', month: 'long' },
                eventTimeFormat: { hour: '2-digit', minute: '2-digit' },
              },
            }}
            locale='pt-br'
            height='auto'
            slotMinTime='06:00'
            firstDay={1}
            allDaySlot={false}
            headerToolbar={{
              left: 'timeGridWeek resourceTimelineDay resourceTimelineWeek',
              center: 'title',
            }}
            buttonText={{
              today: 'Hoje',
              timeGridWeek: 'Geral',
              resourceTimelineDay: 'Sala / Dia',
              resourceTimelineWeek: 'Sala / Semana',
            }}
            events={allocation}
            eventContent={EventContent}
            displayEventTime
            resources={resources}
            resourceAreaWidth='12%'
            resourceGroupField='building'
            resourceAreaHeaderContent='Salas'
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default Allocations;
