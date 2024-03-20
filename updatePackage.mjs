import { getDirectories, updatePackageJSON } from "./utils.js";

(async () => {
  try {
    const directories = await getDirectories("./demo");
    const getNpmSdkVersion = async () => {
      return fetch(`https://registry.npmjs.org/turborepo-demo-core/latest`)
        .then((res) => res.json())
        .then(({ version }) => version);
    };
    const version = await getNpmSdkVersion();
    console.log("version: ", version);
    await updatePackageJSON("./demo", directories, version);
  } catch (error) {
    console.error("❌ error: ", error);
  }
})();
