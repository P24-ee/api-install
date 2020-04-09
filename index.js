const MigrationHandler = require("./MigrationHandler");
const SeedHandler = require("./SeedHandler");
const { Db, Repository } = require("p24-api-db");
const MigrationRepository = require('./repositories/MigrationRepository');

const Installer = () => {

    const db = Db(true);
    const repository = Repository(db);
    const migrationHandler = MigrationHandler(repository);
    const seedHandler = SeedHandler(db);

    repository.add('migration', MigrationRepository(db));

    migrationHandler.add(
        '2020032715001_create_migrations',
        __dirname + "/../migrations/2020032715001_create_migrations.sql"
    );

    const addMigration = migrationHandler.add;
    const addSeed = seedHandler.add;
    const getRepository = () => {
        return repository;
    };
    const getDb = () => {
        return db;
    };
    const getMigrationHandler = () => {
        return migrationHandler;
    };
    const getSeedHandler = () => {
        return seedHandler;
    };

    const install = async () => {
        let response = [];

        let migrationResponse = await migrationHandler.handle();
        if(typeof migrationResponse === 'object') {
            const migrationResponseLength = migrationResponse.length;
            for(let i=0; i<migrationResponseLength; i++) {
                const value = migrationResponse[i];
                response.push(value);
            }
        }

        let seedResponse = await seedHandler.handle();
        if (typeof seedResponse === 'object') {
            const seedResponseLength = seedResponse.length;
            for(let i=0; i<seedResponseLength; i++) {
                const value = seedResponse[i];
                response.push(value);
            }
        }

        db.close();

        return response;
    };

    return {
        getRepository,
        getMigrationHandler,
        getSeedHandler,
        getDb,
        addMigration,
        addSeed,
        install,
    }
};

module.exports = Installer;
