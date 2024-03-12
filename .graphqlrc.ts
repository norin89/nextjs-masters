const nextEnv = require('@next/env');

nextEnv.loadEnvConfig(process.cwd());

const config = {
	overwrite: true,
	schema: process.env.GRAPHQL_URL,
	ignoreNoDocuments: true,
	documents: 'src/graphql/*.graphql',
	generates: {
		'src/gql/': {
			plugins: [],
			preset: 'client',
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				useTypeImports: true,
				enumsAsTypes: true,
				defaultScalarType: 'unknown',
				skipTypename: true,
				documentMode: 'string',
				scalars: {
					DateTime: 'Date',
				},
			},
		},
	},
};

module.exports = config;
