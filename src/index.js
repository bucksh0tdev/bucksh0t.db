'use strict';
const paths = require("path");
const fs = require("fs");
const fse = require('fs-extra');
const { set, get, unset } = require("lodash");
const ErrorShow = require("./error.js");
const EventEmitter = require('events');
class Emitter extends EventEmitter {}

class create {
    constructor(path = "datas.json", maxlimit = 0) {
        const mainEmitter = new Emitter();
        this.create = create;
      
        const setup = () => {
            if(!path || (isNaN(maxlimit))) throw new ErrorShow("Unapproved path/limit");

            this.path = paths.join(process.cwd(), path);

            if(!String(this.path).endsWith(".json")) throw new ErrorShow("Database should be json file");
            if(!fs.existsSync(this.path)) {
                fse.outputFileSync(this.path, "{}");
            }
        }

        const toJSON = (limit = 0) => {
            setup();
            const allData = this.all(limit, false);
            const json = {};
            for (const element of allData) {
                json[element.ID] = element.data;
            }
            return json;
        }

        this.set = function(key, value) {
            setup();
            if (!key || String(key).length < 1 || typeof key !== "string") throw new ErrorShow("Unapproved key");
            if (String(value).length < 1) throw new ErrorShow("Unapproved value");
            if(maxlimit != 0 && this.size() >= maxlimit) throw new ErrorShow("Data limit exceeded");
            let jsonData = toJSON();

            let control = this.get(key);
            if(control) {
                mainEmitter.emit("update", { key: key, last: control, new: value });
            } else {
                mainEmitter.emit("create", { key: key, value: value });
            }

            set(jsonData, key, value);
            fs.writeFileSync(this.path, JSON.stringify(jsonData, null, 4));
            return value;
        }

        this.add = function(key, value) {
            setup();
            if (!key || String(key).length < 1 || typeof key !== "string") throw new ErrorShow("Unapproved key");
            if (String(value).length < 1) throw new ErrorShow("Unapproved value");
            let data = Number(this.get(key)) || 0;
            if (isNaN(data)) throw new ErrorShow("Unapproved content");
            let result = Number(data + Number(value))
            this.set(key, result)
            return result;
        }

        this.on = mainEmitter.on;

        this.push = function(key, value) {
            setup();
            if (!key || String(key).length < 1 || typeof key !== "string") throw new ErrorShow("Unapproved key");
            if (String(value).length < 1) throw new ErrorShow("Unapproved value");
            let data = this.get(key) || [];

            var result;
            if(data) {
                if (!Array.isArray(data)) throw new ErrorShow("Target is not an array");
                try {
                    data.push(value);
                    result = data;
                } catch (err) {
                    throw new ErrorShow("Pushing Problem");
                }
            }
            this.set(key, result);
            return result;
        }

        this.get = function(key) {
            setup();
            if (!key || String(key).length < 1 || typeof key !== "string") throw new ErrorShow("Unapproved key");
            let jsonData = toJSON();
            if(!jsonData) return false;
            let control = get(jsonData, key);
            if(!control) return false;
            return control;
        }

        this.fetch = function(key) {
            setup();
            let control = this.get(key);
            return control;
        }

        this.has = function(key) {
            setup();
            if (!key || String(key).length < 1 || typeof key !== "string") throw new ErrorShow("Unapproved key");
            let control = this.get(key);
            return Boolean(control);
        }

        this.all = function(limit = 0, type = true) {
            setup();
            if (typeof limit !== "number") throw new ErrorShow("Must be of limit number type");
            let jsonData;
            try {
                jsonData = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (err) {
                throw new ErrorShow("Json File Problem");
            }
            const arr = [];
            for (const key in jsonData) {
                arr.push((type) ? jsonData[key] : { ID: key, data: jsonData[key] });
            }
            return limit > 0 ? arr.splice(0, limit) : arr;
        }

        this.size = function() {
            setup();
            let all = toJSON();
            if(!all) return 0;
            let alls = Object.keys(all);
            if(!alls || !alls.length || isNaN(alls.length) != false) return 0;
            return Number(alls.length) || 0;
        }

        this.delete = function(key) {
            setup();
            if (!key || String(key).length < 1 || typeof key !== "string") throw new ErrorShow("Unapproved key");
            let jsonData = toJSON();
            if(!jsonData) return false;
            
            let control = this.get(key);
            if(control) mainEmitter.emit("delete", { key: key, value: control });

            unset(jsonData, key)
            fs.writeFileSync(this.path, JSON.stringify(jsonData, null, 4))
            return;
        }
    }
}

module.exports = new create()