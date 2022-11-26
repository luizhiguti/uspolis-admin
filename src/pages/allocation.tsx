import { Grid, GridItem, Skeleton, Text } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import eventsByClassroomsPlugin from 'components/allocation/eventsByClassrooms.plugin';
import EventContent from 'components/allocation/eventContent';
import Navbar from 'components/common/navbar.component';
import { useEffect, useState, useContext } from 'react';
import AllocationService from 'services/events.service';
import { AllocationEventsMapper, AllocationResourcesFromEventsMapper } from 'utils/mappers/allocation.mapper';
import { appContext } from 'context/AppContext';

function Allocation() {
  const [allocation, setAllocation] = useState<any[]>([]);
  const [resources, setResources] = useState<{ id: string }[]>([]);
  const { loading, setLoading } = useContext(appContext);

  const allocationService = new AllocationService();

  useEffect(() => {
    setLoading(true);
    Promise.all([allocationService.list()]).then((values) => {
      setAllocation(AllocationEventsMapper(values[0].data));
      setResources(AllocationResourcesFromEventsMapper(values[0].data));
      setLoading(false);
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
          <Skeleton isLoaded={!loading} h='100vh' startColor='blue.300'>
            <FullCalendar
              schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
              plugins={[timeGridPlugin, resourceTimelinePlugin, eventsByClassroomsPlugin]}
              initialView='eventsByClassrooms'
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
                  titleFormat: { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' },
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
                eventsByClassrooms: {
                  duration: { weeks: 1 },
                },
              }}
              locale='pt-br'
              height='auto'
              slotMinTime='06:00'
              firstDay={1}
              allDaySlot={false}
              headerToolbar={{
                left: 'eventsByClassrooms timeGridWeek resourceTimelineDay resourceTimelineWeek',
                center: 'title',
              }}
              buttonText={{
                eventsByClassrooms: 'Salas',
                timeGridWeek: 'Geral',
                resourceTimelineDay: 'Sala / Dia',
                resourceTimelineWeek: 'Sala / Semana',
                today: 'Hoje',
              }}
              events={allocation}
              eventContent={EventContent}
              displayEventTime
              resources={resources}
              resourceAreaWidth='12%'
              resourceGroupField='building'
              resourceAreaHeaderContent='Salas'
            />
          </Skeleton>
        </GridItem>
      </Grid>
    </>
  );
}

export default Allocation;
