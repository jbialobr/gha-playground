const core = require('@actions/core');

try {
  const environment = core.getInput('environment');
  const envCfgFile = core.getInput('env-config-file');
  const config = require(envCfgFile);
  const vars = {};
  if (config) {
    Object.assign(vars, config.vars);
    const region = config.regions[process.env.REGION];
    if (region) {
      Object.assign(vars, region.vars);
    }
    const env = config.environments[environment];
    if (env) {
      Object.assign(vars, env.vars);
      const envRegion = env[region];
      if (envRegion) {
        Object.assign(vars, envRegion.vars);
      }
    }
    Object.keys(vars).map(k => core.exportVariable(k, vars[k]));
  }
} catch (error) {
  core.setFailed(error.message);
}
