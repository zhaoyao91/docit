import {loadAppModule} from './core';

loadAppModule(require('bundle-loader!./app')).then(mountApp => mountApp());