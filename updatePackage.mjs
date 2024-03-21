import { getDirectories, updatePackageJSON } from "./utils.js";

(async () => {
  try {
    const directories = await getDirectories("./demo");
    const getNpmSdkVersion = async () => {
      return fetch(`https://registry.npmjs.org/turborepo-demo-core/latest`)
        .then((res) => res.json())
        .then(({ version }) => version);
    };
    // process.argv[2] from shell script verison like `yarn updatAll x.x.x`
    const version = process.argv[2]
      ? process.argv[2]
      : await getNpmSdkVersion();
    console.log("version: ", version);
    await updatePackageJSON("./demo", directories, version);
  } catch (error) {
    console.error("❌ error: ", error);
  }
})();
