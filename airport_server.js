const {
    Model
} = require('objection');
const knex = require('knex')(require('./knexfile').development); // check here if compiling issue
Model.knex(knex);

const {
    Aircraft
} = require('./Aircraft');
const {
    Airline
} = require('./Airline');
const {
    Airport
} = require('./Airport');
const {
    Flight
} = require('./Flight');

const Hapi = require('hapi');
const Joi = require('joi');
const Boom = require('boom');
// const Bcrypt = require('bcrypt');
// const JWT = require('jsonwebtoken');
// const JWT_SECRET_KEY = require('./key.js')['jwtKey'];

const server = new Hapi.Server();

// Configure the port on which the server will listen
server.connection({
    port: 3000
});

/* //////////////          TOKEN & VALIDATION
const createToken = userId => {
    return JWT.sign({
            user_id: userId
        },
        JWT_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d'
        }
    );
};

const validate = (decoded, request, callback) => {
    if (decoded.hasOwnProperty('user_id')) {
        User.query().findById(decoded.user_id)
            .then(user => {
                if (user) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            })
            .catch(err => callback(null, false));
    } else {
        callback(null, false);
    }
};


server.register(require('hapi-auth-jwt2'), (err) => {
    if (err) {
        throw err;
    }

    server.auth.strategy('simple', 'jwt', {
        key: JWT_SECRET_KEY,
        validateFunc: validate,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });
*/


      server.route([
      {
            method: 'POST',
            path: '/api/airlines',
            config: {
                  description: 'Create new airline.',
                  validate: {
                        payload: {
                              code: Joi.string().min(2).max(3).required(),
                              name: Joi.string().required()
                        }
                  }
            },
            handler: (request, reply) => {
                  Airline.query()
                  .insert(request.payload)
                  .then(data => reply(data))
                  .catch(err => reply(Boom.internal(err)));
            }
      },
      {
            method: 'GET',
            path: '/api/airlines',
            config: {
                  description: 'Fetch all airlines.'
            },
            handler: (request, reply) => {
                  Airline.query()
                  .then(data => reply(data))
                  .catch(err => reply(Boom.internal(err)));
            }
      },
      {
            method: 'GET',
            path: '/api/airlines/{code}',
            config: {
                  description: 'Fetch specified airline.',
                  validate: {
                        params: {
                              code: Joi.string().min(2).max(2)
                        }
                  }
            },
            handler: (request, reply) => {
                  Airline.query()
                  .where('code', request.params.code)
                  .then(data => reply(data))
                  .catch(err => reply(Boom.internal(err)));
            }
      },
      {
            method: 'GET',
            path: '/api/airlines/{code}/aircraft',
            config: {
                  description: 'Fetch all airlines.',
                  validate: {
                        params: {
                              code: Joi.string().min(2).max(2)
                        }
                  }
            },
            handler: (request, reply) => {
                  Airline.query()
                  .from('aircraft')
                  .innerJoin('flight', 'flight.aircraft_id', 'aircraft.id')
                  .innerJoin('airline', 'flight.airline_id', 'airline.id')
                  .where('code', request.params.code)
                  .then(data => reply(data))
                  //.catch(err => reply(Boom.internal(err)));
            }
      },
      {
            method: 'PATCH',
            path: '/api/airlines/{code}',
            config: {
                  description: 'Create new airline.',
                  validate: {
                        params: {
                              code: Joi.string().min(2).max(3)
                        },
                        payload: {
                              code: Joi.string().min(2).max(3),
                              name: Joi.string()
                        }
                  }
            },
            handler: (request, reply) => {
                  Airline.query()
                  .update(request.payload)
                  .where('code', request.params.code)
                  .then(data => reply(data))
                  .catch(err => reply(Boom.internal(err)));
            }
      },
      {
            method: 'DELETE',
            path: '/api/airlines/{code}',
            config: {
                  description: 'Create new airline.',
                  validate: {
                        params: {
                              code: Joi.string().min(2).max(3)
                        }
                  }
            },
            handler: (request, reply) => {
                  Airline.query()
                  .delete()
                  .where('code', request.params.code)
                  .then(data => reply(data))
                  .catch(err => reply(Boom.internal(err)));
            }
      }

      ]);
//}); closing brackets for TOKEN stuff

server.register([
    require('vision'),
    require('inert'),
    require('lout')
], err => {
    if (err) {
        throw err;
    }

    server.start(err => {
        if (err) {
            throw err;
        }
        console.log('Server running at', server.info.uri);
    });
});

module.exports = server;
