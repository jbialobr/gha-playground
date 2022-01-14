const core = require('@actions/core');
const fs = require('fs');

try {
  const environment = core.getInput('environment');
  const envCfgFile = core.getInput('env-config-file');
  const config = JSON.parse(fs.readFileSync(envCfgFile));
  if (config) {
    const env = config.environments[environment];
    if (env) {
      const regions = env.regions;
      if (regions) {
        const jsont = JSON.stringify({ region: Object.keys(regions) });
        console.log(jsont);
        core.setOutput('matrix', jsont);
      }
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
