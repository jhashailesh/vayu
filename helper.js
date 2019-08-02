String.prototype.insert = function (index, str) {
  if (index > 0) {
    return this.substring(0, index) + str + this.substring(index, this.length);
  }
  return str + this;
};


function getUpdatedRoute(val, name, component) {
  
let ind = 0;
let re = /import \w+ from/g;
while ((match = re.exec(val)) != null) {
    ind = match.index;
}

let ind1 = 0;
 let re1 = /]/g;
while ((match = re1.exec(val)) != null) {
    ind1 = match.index;
}

val = val.insert(ind1 , `, ...${name}`);
val = val.insert(ind - 1, `\nimport ${name} from './../components/${component}';`);
return val;
}

module.exports = {
  getUpdatedRoute
}