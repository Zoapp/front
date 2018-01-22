/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default class PluginsManager {
  constructor(app = null) {
    this.app = app;
    this.plugins = {};
    this.load();
  }

  load() {
    this.todo = { };
    // const that = this;
    /*
    loadPlugin(this, (plugin) => {
      that.startPlugin(plugin);
    }); */
  }

  startPlugin(plugin) {
    const name = plugin.getName();
    this.plugins[name] = plugin;
    if (plugin.start) {
      plugin.start();
    }
  }

  getPlugin(name) {
    return this.plugins[name];
  }

  instanciate(name, origin) {
    const service = this.plugins[name];
    let instance = null;
    if (service.instanciate) {
      instance = service.instanciate(origin);
    } else {
      instance = {};
      instance.name = service.getName();
      instance.title = service.getTitle();
      instance.origin = origin;
      instance.color = service.getColor();
      instance.icon = service.getIcon();
      instance.type = service.getType();
    }
    instance.status = "disabled";
    return instance;
  }
  getPlugins({ type = null, activated = null }) {
    const plugins = [];
    Object.keys(this.plugins).forEach((pluginName) => {
      const p = this.plugins[pluginName];
      if ((type === null || p.isType(type)) && (activated === null || p.isActive() === activated)) {
        plugins.push(p);
      }
    }, this);
    return plugins;
  }
}
