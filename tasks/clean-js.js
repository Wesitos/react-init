'use strict';

var del = require('del');
var scriptConf = require("../config.json").script;

module.exports =  function(){
    return del(scriptConf.build);
};
