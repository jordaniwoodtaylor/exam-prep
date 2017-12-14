const { Model } = require('objection');

class Airport extends Model {
    static get tableName() {
        return 'airport';
    }
    static get relationMappings() {
        return {
            from_flight: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Flight',
                join: {
                    from: 'aircraft.id',
                    to: 'flight.from_airport_id'
                }
            },
            to_flight: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Flight',
                join: {
                    from: 'aircraft.id',
                    to: 'flight.to_airport_id'
                }
            }
        };
    }
}

module.exports = { Airport };
