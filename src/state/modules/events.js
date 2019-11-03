export default {
  state: {
    events: [
      {
        _id: '1',
        name: 'Project Management Lecture',
        location: 'room N117',
        date: '2019-10-23',
        time: '2:00',
        end_date: '2019-10-23',
        end_time: '3:00',
        staff: 'Tiffany Young',
        tasks: 'Client Meeting',
        notes: '',
      },
    ],
  },
  getters: {
    getEvents: state => {
      return state.events;
    },
  },
};
