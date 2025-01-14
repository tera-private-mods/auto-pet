const DefaultSettings = {
	"enabled": true,
	"petFood": [
		{
			"id": 206049,
			"name": "Puppy Figurine",
			"cd": 2
		},
		{
			"id": 206050,
			"name": "Piglet Figurine",
			"cd": 2
		},
		{
			"id": 206051,
			"name": "Popori Figurine",
			"cd": 2
		}],
	"feedWhenBelow": 90,
	"servantsList": {},
	"characters": {}
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined)
		return { ...DefaultSettings, ...settings };
	else if (from_ver === null) return DefaultSettings;
	else {
		if (from_ver + 1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}

		switch (to_ver) {
			default:
				Object.keys(settings).forEach(key => delete settings[key]);
				settings = JSON.parse(JSON.stringify(DefaultSettings));
				break;
		}
		return settings;
	}
};