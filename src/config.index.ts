import {writeFile} from 'fs';

import {name, version} from '../package.json';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   supabase: {
        url: '${process.env.SUPABASE_URL}',
        anonKey: '${process.env.SUPABASE_ANON_KEY}'
    },
    google_client_id: '${process.env.GOOGLE_AUTH_CLIENT_ID}',
    name: '${name}',
    version: '${version}'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
