const core = require('@actions/core');
const fs = require('fs');

try {
  const environment = core.getInput('environment');
  const envCfgFile = core.getInput('env-config-file');
  const config = JSON.parse(fs.readFileSync(envCfgFile));
  const vars = {};
  if (config) {
    Object.assign(vars, config.vars);
    const regionKey = process.env.REGION;
    const region = config.regions[regionKey];
    if (region) {
      Object.assign(vars, region.vars);
    }
    const env = config.environments[environment];
    if (env) {
      Object.assign(vars, env.vars);
      if (env.regions) {
        const envRegion = env.regions[regionKey];
        if (envRegion) {
          Object.assign(vars, envRegion.vars);
        }
      }
    }
    Object.keys(vars).map(k => core.exportVariable(k, vars[k]));
  }
} catch (error) {
  core.setFailed(error.message);
}
