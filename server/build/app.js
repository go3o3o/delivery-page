"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var config_1 = require("./config");
var logger_1 = require("./logger");
var auth_1 = require("./routes/auth");
var category_1 = require("./routes/category");
var stopServer = function (server) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server.close()];
            case 1:
                _a.sent();
                process.exit();
                return [2 /*return*/];
        }
    });
}); };
function runServer() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var app, server;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            app = express();
            app.use(express.json());
            app.use(cors());
            app.use(express.static(path.join(__dirname, '../../dist')));
            app.use('/auth', auth_1.default);
            app.use('/category', category_1.default);
            app.get('*', function (req, res) {
                res.sendFile(path.join(__dirname, '../../dist/index.html'));
            });
            server = app.listen(8000, function () {
                logger_1.default.debug('Example app listening on port 8000!');
            });
            typeorm_1.createConnection({ type: 'mysql', url: config_1.default.db.url })
                .then(function (connection) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    logger_1.default.debug('Connected to DB');
                    return [2 /*return*/];
                });
            }); })
                .catch(function (error) {
                logger_1.default.error('TypeORM connection error: ', error);
                stopServer(server);
            });
            return [2 /*return*/];
        });
    });
}
runServer()
    .then(function () {
    logger_1.default.info('run succesfully');
})
    .catch(function (ex) {
    logger_1.default.error('Unable run:', ex);
});
//# sourceMappingURL=app.js.map