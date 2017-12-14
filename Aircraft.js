const { Model } = require('objection');

class Aircraft extends Model {
    static get tableName() {
        return 'aircraft';
    }
    static get relationMappings() {
        return {
            flights: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Flight',
                join: {
                    from: 'aircraft.id',
                    to: 'flight.address_id'
                }
            }
        };
    }
}

module.exports = { Aircraft };
