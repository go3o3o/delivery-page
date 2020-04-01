"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express = require("express");
var jwt = require("jwt-simple");
var config_1 = require("../config");
var Member_1 = require("../entities/Member");
var router = express.Router();
var isValidEmail = function (email) {
    var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email);
};
var checkEmailPw = function (email, pw) {
    if (!email || !pw) {
        return { msg: '이메일 또는 비밀번호를 넣어주세요.' };
    }
    if (!isValidEmail(email)) {
        return { msg: '이메일 양식에 맞게 넣어주세요.' };
    }
};
router.post('/login', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, error, user, isValidPassword, token;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                error = checkEmailPw(email, password);
                if (error) {
                    return [2 /*return*/, res.status(400).send(error)];
                }
                return [4 /*yield*/, Member_1.Member.findOne({ where: { email: email } })];
            case 1:
                user = _b.sent();
                if (user) {
                    isValidPassword = user.validPassword(password);
                    if (isValidPassword) {
                        token = jwt.encode({ seq: user.seq, email: user.email }, config_1.default.auth.key);
                        res.json({ data: { token: token, user: user }, msg: '로그인 성공!' });
                    }
                    else {
                        return [2 /*return*/, res.status(400).json({ msg: '비밀번호가 잘 못 되었습니다.' })];
                    }
                }
                else {
                    return [2 /*return*/, res.status(404).json({ msg: '해당하는 사용자가 없습니다.' })];
                }
                return [2 /*return*/];
        }
    });
}); });
router.post('/signup', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, error, user, createdUser;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                error = checkEmailPw(email, password);
                if (error) {
                    return [2 /*return*/, res.status(400).send(error)];
                }
                return [4 /*yield*/, Member_1.Member.findOne({
                        where: { email: email }
                    })];
            case 1:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({ msg: '이미 등록된 이메일 입니다.' })];
                }
                return [4 /*yield*/, Member_1.Member.create({ email: email, password: password })];
            case 2:
                createdUser = _b.sent();
                return [2 /*return*/, res.json({
                        data: { seq: createdUser.seq },
                        msg: '가입에 성공하였습니다.'
                    })];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=auth.js.map