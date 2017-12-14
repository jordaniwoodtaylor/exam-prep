const { Model } = require('objection');
const { Aircraft } = require('./Aircraft');
const { Airline } = require('./Airline');
const { Airport } = require('./Airport');

class Flight extends Model {
    static get tableName() {
        return 'flight';
    }
    static get relationMappings() {
        return {
            aircraft: {
                relation: Model.HasOneRelation,
                modelClass: __dirname + '/Aircraft',
                join: {
                    from: 'flight.aircraft_id',
                    to: 'aircraft.id'
                }
            },
            airline: {
                relation: Model.HasOneRelation,
                modelClass: __dirname + '/Airline',
                join: {
                    from: 'flight.airline_id',
                    to: 'airline.id'
                }
            },
            from_airport: {
                relation: Model.HasOneRelation,
                modelClass: __dirname + '/Airport',
                join: {
                    from: 'flight.from_airport_id',
                    to: 'airport.id'
                }
            },
            to_airport: {
                relation: Model.HasOneRelation,
                modelClass: __dirname + '/Airport',
                join: {
                    from: 'flight.to_airport_id',
                    to: 'airport.id'
                }
            }
        }
    }
}

module.exports = { Flight };
