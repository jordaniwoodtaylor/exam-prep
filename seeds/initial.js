exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flight').del()
      .then(() => knex('airline').del())
      .then(() => knex('aircraft').del())
      .then(() => knex('airport').del())
      .then(() => {
      return knex('airport').insert([
          {id: 1, code: 'IND', city: 'Indianapolis, IN'},
          {id: 2, code: 'ANC', city: 'Alaska, AK'},
          {id: 3, code: 'SAN', city: 'San Diego, CA'},
          {id: 4, code: 'BDL', city: 'Hartford, CO'},
          {id: 5, code: 'LAX', city: 'Los Angeles, CA'}
          ]);
        })
      .then(() => {
      return knex('airline').insert([
          {id: 1, code: 'UA', name: 'United Airlines'},
          {id: 2, code: 'WN', name: 'Southwest'},
          {id: 3, code: 'AS', name: 'Alaska Airlines'}
          ]);
        })
      .then(() => {
      return knex('aircraft').insert([
          {id: 1, manufacturer: 'Boeing', model: '747'},
          {id: 2, manufacturer: 'Tesla', model: '101'},
          {id: 3, manufacturer: 'Airbus', model: '299'}
          ]);
        })
      .then(() => {
      return knex('flight').insert([
          {id: 1, number: 101, airline_id: 1, aircraft_id: 1, from_airport_id: 1, to_airport_id: 2},
          {id: 2, number: 102, airline_id: 2, aircraft_id: 1, from_airport_id: 2, to_airport_id: 3},
          {id: 3, number: 103, airline_id: 2, aircraft_id: 2, from_airport_id: 3, to_airport_id: 4},
          {id: 4, number: 104, airline_id: 3, aircraft_id: 3, from_airport_id: 5, to_airport_id: 1},
          ]);
        })
};
// Command to create initial seed data:  ./node_modules/.bin/knex seed:make initial-data
// Command to populate seed data:  ./node_modules/.bin/knex seed:run
