const MigrationRepository = db => {

    const TABLE_NAME = 'migrations';

    const getLastMigration = async () => {
        const results = await db.query(
            'SELECT name FROM migrations ORDER BY id DESC LIMIT 1'
        );
        if (results && results.length > 0) {
            const result = results[0];
            return result.name;
        }

        return null;
    };

    const addRow = async (name) => {
        await db.insert(TABLE_NAME, {
            name: name
        });

        return 'New row added!';
    };

    return {
        getLastMigration,
        addRow
    };
};

module.exports = MigrationRepository;
