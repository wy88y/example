/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (props, items) => {
  class StripPrivateProperties {
    constructor(opts, objs) {
      if (!Array.isArray(opts)) {
        throw new Error('inpurt should be array');
      }
      this.opts = opts;
      this.res = objs;
    }
    isInclude(key) {
      return this.opts.includes(key);
    }
    main() {
      return this.res.map(item => Object.keys(item).reduce((obj, key) => {
        if (!this.isInclude(key)) {
          obj[key] = item[key];
        }
        return obj;
      }, {}));
    }
  }
  return new StripPrivateProperties(props, items).main();
};
exports.excludeByProperty = (prop, items) => items.filter(it => it[prop] === undefined);
exports.sumDeep = (items) => {
  class SumDeep {
    constructor(arr) {
      if (!Array.isArray(arr)) {
        throw new Error('should be array');
      }
      this.arr = arr;
      this.res = [];
    }
    main() {
      this.arr.map((item) => {
        this.res.push({
          objects: item.objects.reduce((sum, curr) => sum += curr.val, 0),
        });
      });
      return this.res;
    }
  }
  return new SumDeep(items).main();
};
exports.applyStatusColor = (props, items) => {
  class ApplyStatusColor {
    constructor(opts, objs) {
      // if (!Array.isArray(this.objs)) {
      //   throw new Error('objs should be an array');
      // }
      this.res = objs;
      this.colorMap = Object.keys(opts).reduce((obj, color) => {
        if (Array.isArray(opts[color])) {
          opts[color].forEach(code => obj[code] = color);
        }
        return obj;
      }, {});
    }
    main() {
      this.res = this.res.reduce((ret, it) => {
        if (this.colorMap[it.status]) {
          ret.push({ ...it, color: this.colorMap[it.status] });
        }
        return ret;
      }, []);
      return this.res;
    }
  }
  return new ApplyStatusColor(props, items).main();
};
exports.createGreeting = (greet, words) => name => greet(words, name);
exports.setDefaults = defProps => items => Object.keys(defProps).reduce((obj, key) => {
  if (obj[key] === undefined) {
    obj[key] = defProps[key];
  }
  return obj;
}, items);
exports.fetchUserByNameAndUsersCompany = (name, services) => services.fetchUsers().then((users) => {
  const user = users.find(it => it.name === name);
  return Promise.all([
    services.fetchStatus(),
    services.fetchCompanyById(user.companyId),
  ]).then(([status, company]) => ({ user, company, status })).catch(err => console.log(err));
}).catch(err => console.log(err));
