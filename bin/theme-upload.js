/* eslint-env node */
const { execSync } = require('child_process');

function zcli(command) {
  const data = execSync(`yarn --silent zcli ${command} --json`);
  return JSON.parse(data.toString());
}

const { themeId } = zcli(`themes:import --brandId=5291581488781`);

zcli(`themes:publish --themeId=${themeId}`);

const { themes } = zcli(`themes:list --brandId=5291581488781`);

for (const { live, id, name } of themes) {
  if (!live && name === "[Don't edit code] Copenhagen Sanctuary Production")
    zcli(`themes:delete --themeId=${id}`);
}
