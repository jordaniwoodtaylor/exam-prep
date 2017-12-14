
// migration for airport

exports.up = function(knex, Promise) {
	return knex.schema.createTable('airline', table => {
		table.increments();
		table.string('code');
            table.string('name');
	})
  .then(() => knex.schema.createTable('aircraft',table => {
        table.increments();
        table.string('manufacturer');
        table.string('model');
  }))
  .then(() => knex.schema.createTable('airport',table => {
        table.increments();
        table.string('code');
        table.string('city');
  }))
  .then(() => knex.schema.createTable('flight',table => {
      	table.increments();
      	table.integer('number');
      	table.string('last_name');
            table.integer('airline_id').references('airline.id');
      	table.integer('aircraft_id').references('aircraft.id');
      	table.integer('from_airport_id').references('airport.id');
      	table.integer('to_airport_id').references('airport.id');
      }));
};

exports.down = function(knex, Promise) {
      return knex.schema.dropTable('flight')
	    .then(() => knex.schema.dropTable('airline'))
          .then(() => knex.schema.dropTable('aircraft'))
          .then(() => knex.schema.dropTable('airport'));
};

// forward migration:  ./node_modules/.bin/knex migrate:latest
// rollback migration:  ./node_modules/.bin/knex migrate:rollback
