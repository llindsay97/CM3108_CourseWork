export default {
  state: {
    events: [
      {
        _id: '1',
        name: 'Project Management Lecture',
        location: 'room N117',
        start: '2019-10-23',
        start_time: '2:00',
        end: '2019-10-23',
        end_time: '3:00',
        staff: 'Tiffany Young',
        tasks: 'Client Meeting',
        notes: 'N/A',
      },
      {
        _id: '1',
        name: 'Project Management Laboratory',
        location: 'room N117',
        start: '2019-10-23',
        start_time: '3:00',
        end: '2019-10-23',
        end_time: '5:00',
        staff: 'Tiffany Young',
        tasks: 'Client Meeting',
        notes: 'N/A',
      },
    ],
  },
  getters: {
    getEvents: state => {
      return state.events;
    },
  },
};
