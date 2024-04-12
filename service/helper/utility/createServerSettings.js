const SetverSettings = require('../../../models/serverSettings');

async function createServerSettings() {
  const count = await  SetverSettings.countDocuments();
    if (count === 0) {
        const settings = new SetverSettings({
            scraping: true,
            filters: [],
        });
        await settings.save();
    }
    return true;
}

module.exports = createServerSettings;