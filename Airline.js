const { Model } = require('objection');

class Airline extends Model {
    static get tableName() {
        return 'airline';
    }
    static get relationMappings() {
        return {
            flights: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Flight',
                join: {
                    from: 'airline.id',
                    to: 'flight.airline_id'
                }
            }
        };
    }
}

module.exports = { Airline };
