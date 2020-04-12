const PropTypes = require('prop-types');

const InstallerPropType = {
    getRepository: PropTypes.func.isRequired,
    getMigrationHandler: PropTypes.func.isRequired,
    getSeedHandler: PropTypes.func.isRequired,
    getDb: PropTypes.func.isRequired,
    addMigration: PropTypes.func.isRequired,
    addSeed: PropTypes.func.isRequired,
    install: PropTypes.func.isRequired,
};

module.exports = InstallerPropType;
