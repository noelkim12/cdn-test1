const file = files[0];
console.log("드롭된 파일:", file);
console.log("이름:", file.name);
console.log("크기:", file.size, "bytes");
console.log("타입:", file.type);

const f = {
  name: file.name,
  data: await readFileAsUint8Array(file),
};

const jsFile = Buffer.from(f.data)
  .toString("utf-8")
  .replace(/^\uFEFF/gm, "");
const splitedJs = jsFile.split("\n");

let name = "";
let displayName = undefined;
let arg = {};
let realArg = {};
let customLink = [];

for (const line of splitedJs) {
  if (line.startsWith("//@risu-name")) {
    alertMd(
      "V1 plugin is not supported anymore, please use V2 plugin instead. for more information, please check the documentation. `https://github.com/kwaroran/RisuAI/blob/main/plugins.md`"
    );
    return;
  }
  if (line.startsWith("//@risu-display-name")) {
    alertMd(
      "V1 plugin is not supported anymore, please use V2 plugin instead. for more information, please check the documentation. `https://github.com/kwaroran/RisuAI/blob/main/plugins.md`"
    );
    return;
  }
  if (line.startsWith("//@name")) {
    const provied = line.slice(7);
    if (provied === "") {
      alertError(
        "plugin name must be longer than 0, did you put it correctly?"
      );
      return;
    }
    name = provied.trim();
  }
  if (line.startsWith("//@display-name")) {
    const provied = line.slice("//@display-name".length + 1);
    if (provied === "") {
      alertError(
        "plugin display name must be longer than 0, did you put it correctly?"
      );
      return;
    }
    displayName = provied.trim();
  }

  if (line.startsWith("//@link")) {
    const link = line.split(" ")[1];
    if (!link || link === "") {
      alertError("plugin link is empty, did you put it correctly?");
      return;
    }
    if (!link.startsWith("https")) {
      alertError("plugin link must start with https, did you check it?");
      return;
    }
    const hoverText = line.split(" ").slice(2).join(" ").trim();
    if (hoverText === "") {
      // OK, no hover text. It's fine.
      customLink.push({
        link: link,
        hoverText: undefined,
      });
    } else
      customLink.push({
        link: link,
        hoverText: hoverText || undefined,
      });
  }
  if (line.startsWith("//@risu-arg") || line.startsWith("//@arg")) {
    const provied = line.trim().split(" ");
    if (provied.length < 3) {
      alertError(
        "plugin argument is incorrect, did you put space in argument name?"
      );
      return;
    }
    const provKey = provied[1];

    if (provied[2] !== "int" && provied[2] !== "string") {
      alertError(
        `plugin argument type is "${provied[2]}", which is an unknown type.`
      );
      return;
    }
    if (provied[2] === "int") {
      arg[provKey] = "int";
      realArg[provKey] = 0;
    } else if (provied[2] === "string") {
      arg[provKey] = "string";
      realArg[provKey] = "";
    }
  }
}

if (name.length === 0) {
  alertError("plugin name not found, did you put it correctly?");
  return;
}

let pluginData = {
  name: name,
  script: jsFile,
  realArg: realArg,
  arguments: arg,
  displayName: displayName,
  version: 2,
  customLink: customLink,
};

let oldPlugin = getDatabase().plugins.filter((_plugin) => _plugin.name == name);
console.log(oldPlugin, oldPlugin.length, oldPlugin.length > 0, name);
if (oldPlugin?.length > 0) {
  await alertMd(
    `${name} 플러그인이 이미 설치되어 있습니다. 기존 플러그인을 덮어씁니다.`
  );
}
// 이름겹치는 플러그인 제거
getDatabase().plugins = getDatabase().plugins.filter(
  (_plugin) => _plugin.name !== name
);
// 제거 후 새로운 플러그인 추가
getDatabase().plugins.push(pluginData);
// DB 저장
setDatabaseLite(getDatabase());

// 플러그인 로드
setTimeout(() => {
  alertMd(`${name} 플러그인이 설치되었습니다.`);
  loadPlugins();
}, 1000);
