const fs = require('fs');

const a_supplementals = fs.readdirSync('src/supplementals');

const supplementals = (s_ext) => a_supplementals.filter(s => s.endsWith(s_ext));

module.exports = {
	tasks: {
		all: 'build/**',

		release: {
			patch: () => ({
				run: /* syntax: bash */ `
					npm --no-git-tag-version version patch
					emk channels/sublime/**
					git add package.json channels/
				`,
			}),
		},
	},

	defs: {
		completion: supplementals('.sublime-completions'),
		preference: supplementals('.tmPreferences.yml')
			.map(s => s.replace(/\.yml$/, '')),
	},

	outputs: {
		channels: {
			sublime: {
				'package-control.json': () => ({
					deps: [
						'src/channel/package-control.js',
						'package.json',
						'build/sublime/**',
					],
					run: /* syntax: bash */ `
						node $1 < $2 > $@
					`,
				}),
			},
		},

		build: {
			sublime: {
				'MapleMBSE-MSE.sublime-package': () => ({
					deps: ['build/sublime/assets/*'],
					run: /* syntax: bash */ `
						cd $(dirname $@)
						zip -r $(basename $@) assets/
					`,
				}),

				assets: {
					'mse.sublime-syntax': () => ({
						deps: ['src/syntax/mse.syntax-source'],
						run: /* syntax: bash */ `
							npx syntax-source build --exporter=sublime-syntax $1 > $@
						`
					}),

					':completion': ({completion:sr_dst}) => ({
						copy: `src/supplementals/${sr_dst}`,
					}),

					':preference': ({preference:sr_dst}) => ({
						deps: [`src/supplementals/${sr_dst}.yml`],
						run: /* syntax: bash */ `
							npx syntax-source convert --from=yaml --to=plist < $1 > $@
						`,
					}),
				},
			},
		},
	},
};
