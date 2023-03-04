'use strict';

// Modules
const _ = require('lodash');

// Builder
module.exports = {
  name: 'openlitespeed',
  config: {
    version: '1.7',
    supported: ['1.7'],
    pinPairs: {
      '1.7': 'bitnami/openlitespeed:1.7.16-ubuntu',
    },
    patchesSupported: true,
    confSrc: __dirname,
    defaultFiles: {
      server: 'httpd.conf',
      vhosts: 'default.conf',
    },
    remoteFiles: {
      server: '/opt/bitnami/apache/conf/httpd.conf',
      vhosts: '/opt/bitnami/apache/conf/vhosts/lando.conf',
    },
    ssl: false,
    webroot: '.',
  },
  parent: '_webserver',
  builder: (parent, config) => class LandoOpenLiteSpeed extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Use different default for ssl
      if (options.ssl) options.defaultFiles.vhosts = 'default-ssl.conf';
      // Build the default stuff here
      const openlitespeed = {
        image: `bitnami/openlitespeed:${options.version}`,
        command: '/launch.sh',
        environment: {
          OPENLITESPEED_HTTP_PORT_NUMBER: '80',
          OPENLITESPEED_HTTPS_PORT_NUMBER: '443',
          OPENLITESPEED_USER: 'www-data',
          OPENLITESPEED_GROUP: 'www-data',
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        ports: ['80'],
        user: 'root',
        volumes: [
          `${options.confDest}/launch.sh:/launch.sh`,
          `${options.confDest}/${options.defaultFiles.server}:${options.remoteFiles.server}`,
          `${options.confDest}/${options.defaultFiles.vhosts}:${options.remoteFiles.vhosts}:ro`,
        ],
      };
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, openlitespeed)});
    };
  },
};
