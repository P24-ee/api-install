const fs = require('fs');

const MigrationHandler = (repository) => {
    let migrations = [];
    const db = repository.getDb();

    const add = (name, filename) => {
        migrations.push([name, filename]);
    };

    const handle = async () => {
        let response = [];
        let lastMigration = '';
        let foundLastMigration = true;

        if(await repository.checkIfTableExists('migrations')) {
            lastMigration = await repository.migration.getLastMigration();
            foundLastMigration = false;
        }

        for (const [name, filename] of migrations) {
            const migration = fs.readFileSync(filename).toString();
            if (foundLastMigration === false) {
                if (lastMigration !== name) {
                    continue;
                }
                foundLastMigration = true;
            }

            await db.query(migration);
            await repository.migration.addRow(name);
            response.push(name);
        }

        if (response.length === 0) {
            response.push('Nothing to migrate!');
        }

        return response;
    };

    return {
        add,
        handle,
    }
};

module.exports = MigrationHandler;
