let s_package = '';
process.stdin.setEncoding('utf8');
process.stdin
	.on('data', (s_chunk) => {
		s_package += s_chunk;
	})
	.on('end', () => {
		let g_package = JSON.parse(s_package);

		// generate channel json for package
		let g_channel = {
			schema_version: '3.0.0',
			packages: [
				{
					name: 'MapleMBSE MSE Configuration',
					details: 'https://github.com/Open-MBEE/MSE',
					labels: [
						'maplembse',
						'jpl',
						'mbse',
						'mse',
						'openmbee'
					],
					releases: [
						{
							version: g_package.version,
							sublime_text: ">=3092",
							url: `https://github.com/Open-MBEE/MSE/raw/v${g_package.version}-asset/sublime-syntax/build/sublime/MapleMBSE-MSE.sublime-package`,
							date: (new Date()).toISOString().replace(/T/, ' ').replace(/\.\d+Z/, ''),
						},
					],
				},
			],
		};

		// dump to output
		process.stdout.write(JSON.stringify(g_channel, null, '\t'));
	});