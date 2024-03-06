import { type CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
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
export default config;
