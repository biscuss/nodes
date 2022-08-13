const fs = require("fs");
const root = "./src";

const utility = {
  init() {
    let allNode = [];
    let allContent = `## 目录

| 索引 | name | description |
| ---- | ---- | ----------- |
`;
    const files = fs.readdirSync(root);
    files.forEach((item) => {
      console.log("item", item);
      try {
        const data = fs.readFileSync(`${root}/${item}/index.json`, "utf8");
        const dataObj = JSON.parse(data);
        const fileIndex = item.split(".")[0];
        let content = `## 目录

| 索引 | name | description |
| ---- | ---- | ----------- |
`;
        dataObj.forEach((node, index) => {
          node.index = Number(
            `${utility.formatClass(fileIndex)}${utility.formatIndex(index)}`
          );
          const now = `| ${node.index} | ${node.name} | ${
            node.description ? node.description : "---"
          }|
`;
          content += now;
          allContent += now;
        });

        const temp = JSON.stringify(dataObj, null, 2);

        allNode = allNode.concat(dataObj);

        fs.writeFileSync(`${root}/${item}/index.json`, temp);
        fs.writeFileSync(`${root}/${item}/index.md`, content);
      } catch (err) {
        console.error(err);
      }
    });
    fs.writeFileSync(`./nodes.json`, JSON.stringify(allNode, null, 2));
    fs.writeFileSync(`./nodes.md`, allContent);
  },
  formatClass(v) {
    if (!v) return;
    switch (v.length) {
      case 1:
        return `100${v}`;
      case 2:
        return `10${v}`;
      case 3:
        return `1${v}`;
      default:
        return;
    }
  },
  formatIndex(v) {
    if (v < 10) {
      return `00000${v}`;
    } else if (v >= 10 && v < 100) {
      return `0000${v}`;
    } else if (v >= 100 && v < 1000) {
      return `000${v}`;
    } else if (v >= 1000 && v < 10000) {
      return `00${v}`;
    } else if (v >= 10 && v < 100) {
      return `0${v}`;
    }
  },
};
utility.init();
