import { db } from '../main';

var eventService = {
  getEvents: () => {
    let events = [];
    db.collection('events')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
          console.log('Event: ' + appData.id + ' added to events array');
          console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch(error => {
        console.log('Error getting events: ' + error);
      });
    return events;
  },
  addEvent: event => {
    db.collection('events')
      .add(event)
      .then(() => {
        console.log('Event successfully added to collection');
      })
      .catch(error => {
        console.log('Error writting document: ' + error);
      });
  },
  updateEvent: event => {},
  deleteEvent: event => {
    db.collection('event')
      .doc(event.id)
      .delete()
      .then(() => {
        console.log('Document: ' + event.id + ' successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  },
  archiveEvent: event => {
    db.collection('events')
      .doc()
      .set({ is_deleted: true }, { merge: true });
  },
};

export default eventService;
