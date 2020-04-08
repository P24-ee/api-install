import MigrationHandler from "./MigrationHandler";
import SeedHandler from "./SeedHandler";
import { Db, Repository } from 'p24-api-db';

const Installer = () => {

    const db = Db(true);
    const repository = Repository(db);

    const install = async () => {
        let response = [];
        const migrationHandler = MigrationHandler(repository);
        const seedHandler = SeedHandler(db);

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
        install
    }
};

module.exports = Installer;
