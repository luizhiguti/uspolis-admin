import { Box, Flex, Heading, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import { createPlugin, sliceEvents } from '@fullcalendar/react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from 'components/common/dataTable.component';
import { EventByClassrooms } from 'models/event.model';
import { Capitalize } from 'utils/formatters';
import { EventsByClassroomMapper } from 'utils/mappers/allocation.mapper';

function ClassroomsTables(props: any) {
  const events = sliceEvents(props);
  const eventsByClassrooms = EventsByClassroomMapper(events);

  return (
    <Wrap>
      {eventsByClassrooms.map(([classroom, data]) => {
        const columns: ColumnDef<EventByClassrooms>[] = [
          {
            accessorKey: 'subjectCode',
            header: classroom,
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
              const data = row.original;
              return (
                <Flex as='button' textAlign='start' onClick={() => console.log('modal para editar alocação')}>
                  <Box bg='blue.200' paddingX={2} paddingY={1} marginRight={2}>
                    <Text fontSize='xs'>{data.startTime}</Text>
                    <Heading size='sm'>{Capitalize(data.weekday)}</Heading>
                    <Text fontSize='xs'>{data.endTime}</Text>
                  </Box>
                  <Box paddingY={1}>
                    <Heading size='sm' noOfLines={1}>
                      {data.subjectCode}
                    </Heading>
                    <Text>{data.classCode}</Text>
                    <Tooltip label={data.professor}>
                      <Text>
                        {data.professor.slice(0, 25)}
                        {data.professor.length > 25 && '...'}
                      </Text>
                    </Tooltip>
                  </Box>
                </Flex>
              );
            },
          },
        ];

        return (
          <WrapItem key={classroom}>
            <DataTable data={data} columns={columns} />
          </WrapItem>
        );
      })}
    </Wrap>
  );
}

export default createPlugin({
  views: {
    eventsByClassrooms: ClassroomsTables,
  },
});
