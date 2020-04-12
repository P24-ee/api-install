const fs = require('fs');
const PropTypes = require('prop-types');
const DbPropType = require('p24-api-db/prop_types/Db.propType');

const SeedHandler = (db) => {
    let seeds = [];

    const add = (name, filename) => {
        seeds.push([name, filename]);
    };

    const handle = async () => {
        let response = [];

        for (const [name, filename] of seeds) {
            const seed = fs.readFileSync(filename).toString();
            await db.query(seed);
            response.push(name);
        }

        if (response.length === 0) {
            response.push('Nothing to seed!');
        }

        return response;
    };

    return {
        add,
        handle
    }
};

if (process.env.NODE_ENV !== 'production') {
    SeedHandler.propTypes = {
        db: PropTypes.shape(DbPropType),
    };
}

module.exports = SeedHandler;
