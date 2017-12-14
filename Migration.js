exports.up = function(knex, Promise){
      return knex.schema
            .createTable('Airline' table =>{
                  table.increments('id')
                  table.string('code')
                  table.string('name')
            });
}
