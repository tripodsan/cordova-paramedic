/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

var DEFAULT_START_PORT = 8008;
var DEFAULT_END_PORT   = 8018;
var DEFAULT_TIMEOUT    = 60 * 60 * 1000; // 60 minutes in msec - this will become a param
var DEFAULT_SAUCE_DEVICE_NAME_ANDROID      = 'Android Emulator';
var DEFAULT_SAUCE_PLATFORM_VERSION_ANDROID = '4.4';
var DEFAULT_SAUCE_DEVICE_NAME_IOS          = 'iPhone Simulator';
var DEFAULT_SAUCE_PLATFORM_VERSION_IOS     = '9.3';
var DEFAULT_SAUCE_APPIUM_VERSION           = '1.5.3';
var DEFAULT_BUILD_NAME                     = 'Paramedic sauce test';

var util = require('./utils').utilities;

function ParamedicConfig(json) {
    this._config = json;
}

ParamedicConfig.prototype.getDefaultSauceDeviceName = function () {
    return this.getPlatformId() === 'android' ? DEFAULT_SAUCE_DEVICE_NAME_ANDROID : DEFAULT_SAUCE_DEVICE_NAME_IOS;
};

ParamedicConfig.prototype.getDefaultSaucePlatformVersion = function () {
    return this.getPlatformId() === 'android' ? DEFAULT_SAUCE_PLATFORM_VERSION_ANDROID : DEFAULT_SAUCE_PLATFORM_VERSION_IOS;
};

ParamedicConfig.parseFromArguments = function (argv) {
    return new ParamedicConfig({
        platform:             argv.platform,
        action:               !!(argv.justbuild || argv.justBuild) ? 'build' : 'run',
        args:                 (!!argv.browserify ? '--browserify ' : ''),
        plugins:              Array.isArray(argv.plugin) ? argv.plugin : [argv.plugin],
        useTunnel:            !!argv.useTunnel,
        verbose:              !!argv.verbose,
        startPort:            argv.startport || argv.port,
        endPort:              argv.endport || argv.port,
        externalServerUrl:    argv.externalServerUrl,
        outputDir:            !!argv.outputDir? argv.outputDir: null,
        logMins:              !!argv.logMins? argv.logMins: null,
        tccDb:                !!argv.tccDbPath? argv.tccDb: null,
        cleanUpAfterRun:      !!argv.cleanUpAfterRun? true: false,
        shouldUseSauce:       !!argv.shouldUseSauce || false,
        buildName:            argv.buildName,
        sauceUser:            argv.sauceUser,
        sauceKey:             argv.sauceKey,
        sauceDeviceName:      argv.sauceDeviceName && argv.sauceDeviceName.toString(),
        saucePlatformVersion: argv.saucePlatformVersion && argv.saucePlatformVersion.toString(),
        sauceAppiumVersion:   argv.sauceAppiumVersion && argv.sauceAppiumVersion.toString(),
        skipAppiumTests:      argv.skipAppium,
        skipMainTests:        argv.skipMainTests,
        ci:                   argv.ci,
        target:               argv.target
    });
};

ParamedicConfig.parseFromFile = function (paramedicConfigPath) {
    return new ParamedicConfig(require(paramedicConfigPath));
};

ParamedicConfig.prototype.getUseTunnel = function () {
    return this._config.useTunnel;
};

ParamedicConfig.prototype.setUseTunnel = function (useTunnel) {
    this._config.useTunnel = useTunnel;
};

ParamedicConfig.prototype.getOutputDir = function () {
    return this._config.outputDir;
};

ParamedicConfig.prototype.setOutputDir = function (outputDir) {
    this._config.outputDir = outputDir;
};

ParamedicConfig.prototype.shouldCleanUpAfterRun = function () {
    return this._config.cleanUpAfterRun;
};

ParamedicConfig.prototype.getPlatform = function () {
    return this._config.platform;
};

ParamedicConfig.prototype.setPlatform = function (platform) {
    this._config.platform = platform;
};

ParamedicConfig.prototype.getAction = function () {
    return this._config.action;
};

ParamedicConfig.prototype.setAction = function (action) {
    this._config.action = action;
};

ParamedicConfig.prototype.getArgs = function () {
    return this._config.args;
};

ParamedicConfig.prototype.getPlatformId = function () {
    return this._config.platform.split('@')[0];
};

ParamedicConfig.prototype.getPlugins = function () {
    return this._config.plugins;
};

ParamedicConfig.prototype.setPlugins = function (plugins) {
    this._config.plugins = Array.isArray(plugins) ? plugins : [plugins];
};

ParamedicConfig.prototype.getExternalServerUrl = function () {
    return this._config.externalServerUrl;
};

ParamedicConfig.prototype.isVerbose = function () {
    return this._config.verbose;
};

ParamedicConfig.prototype.isJustBuild = function () {
    return this._config.justbuild;
};

ParamedicConfig.prototype.shouldUseSauce = function () {
    return this._config.shouldUseSauce;
};

ParamedicConfig.prototype.setShouldUseSauce = function (sus) {
    this._config.shouldUseSauce = sus;
};

ParamedicConfig.prototype.getBuildName = function () {
    return this._config.buildName || DEFAULT_BUILD_NAME;
};

ParamedicConfig.prototype.setBuildName = function (buildName) {
    this._config.buildName = buildName;
};

ParamedicConfig.prototype.getDefaultBuildName = function () {
    return DEFAULT_BUILD_NAME;
};

ParamedicConfig.prototype.getSauceUser = function () {
    return this._config.sauceUser || process.env[util.SAUCE_USER_ENV_VAR];
};

ParamedicConfig.prototype.setSauceUser = function (sauceUser) {
    this._config.sauceUser = sauceUser;
};

ParamedicConfig.prototype.getSauceKey = function () {
    return this._config.sauceKey || process.env[util.SAUCE_KEY_ENV_VAR];
};

ParamedicConfig.prototype.setSauceKey = function (sauceKey) {
    this._config.sauceKey = sauceKey;
};

ParamedicConfig.prototype.getSauceDeviceName = function () {
    return this._config.sauceDeviceName || this.getDefaultSauceDeviceName();
};

ParamedicConfig.prototype.setSauceDeviceName = function (sauceDeviceName) {
    this._config.sauceDeviceName = sauceDeviceName.toString();
};

ParamedicConfig.prototype.getSaucePlatformVersion = function () {
    return this._config.saucePlatformVersion || this.getDefaultSaucePlatformVersion();
};

ParamedicConfig.prototype.setSaucePlatformVersion = function (saucePlatformVersion) {
    this._config.saucePlatformVersion = saucePlatformVersion.toString();
};

ParamedicConfig.prototype.getSauceAppiumVersion = function () {
    return this._config.sauceAppiumVersion || DEFAULT_SAUCE_APPIUM_VERSION;
};

ParamedicConfig.prototype.setSauceAppiumVersion = function (sauceAppiumVersion) {
    this._config.sauceAppiumVersion = sauceAppiumVersion.toString();
};

ParamedicConfig.prototype.runMainTests = function () {
    return !this._config.skipMainTests;
};

ParamedicConfig.prototype.setSkipMainTests = function (skipMainTests) {
    this._config.skipMainTests = skipMainTests;
};

ParamedicConfig.prototype.runAppiumTests = function () {
    return !this._config.skipAppiumTests;
};

ParamedicConfig.prototype.setSkipAppiumTests = function (skipAppiumTests) {
    this._config.skipAppiumTests = skipAppiumTests;
};

ParamedicConfig.prototype.isBrowserify = function () {
    return this._config.browserify;
};

ParamedicConfig.prototype.getPorts = function () {
    return {
        start: this._config.startPort || DEFAULT_START_PORT,
        end: this._config.endPort || DEFAULT_END_PORT
    };
};

ParamedicConfig.prototype.getTimeout = function () {
    return DEFAULT_TIMEOUT;
};

ParamedicConfig.prototype.getLogMins = function () {
    return this._config.logMins;
};

ParamedicConfig.prototype.setLogMins = function (logMins) {
    this._config.logMins = logMins;
};

ParamedicConfig.prototype.setTccDb = function (tccDb) {
    this._config.tccDb = tccDb;
};

ParamedicConfig.prototype.getTccDb = function () {
    return this._config.tccDb;
};

ParamedicConfig.prototype.isCI = function () {
    return this._config.ci;
};

ParamedicConfig.prototype.setCI = function (isCI) {
    this._config.ci = isCI;
};

ParamedicConfig.prototype.getTarget = function () {
    return this._config.target;
};

ParamedicConfig.prototype.setTarget = function (target) {
    this._config.target = target;
};

module.exports = ParamedicConfig;
