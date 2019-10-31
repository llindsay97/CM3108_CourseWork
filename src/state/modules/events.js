import eventService from '../../DAL/eventService';

export default {
  state: {
    events: [],
  },
  mutations: {
    updateEvents: (state, events) => {
      state.events = events;
    },
  },
  actions: {
    retrieveEvents: async ({ commit }) => {
      let events = await eventService.getEvents();
      commit('updateEvents', events);
    },
  },
  getters: {
    getEvents: state => {
      return state.events;
    },
  },
};
