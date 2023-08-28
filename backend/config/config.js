module.exports = {
  "development": {
    "secret": 'Kill!Me!Now!Please',
    "port": 3000,
    "expiresIn": '1h',

    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": './freenety.dev.db.sqlite3'
  },
  "test": {
    "secret": 'Kill!Me!Now!Please',
    "port": 4000,
    "expiresIn": 3600,

    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": './freenety.test.db.sqlite3'
  },
  "production": {
    "secret": 'Kill!Me!Now!Please',
    "port": 5000,
    "expiresIn": 3600,

    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": './freenety.prod.db.sqlite3'
  }
}
