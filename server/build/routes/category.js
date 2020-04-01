"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express = require("express");
var Store_1 = require("../entities/Store");
var router = express.Router();
router.get('/:category', function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var category, stores, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = req.params.category;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Store_1.Store.find({
                        where: { category: category }
                    })];
            case 2:
                stores = _a.sent();
                return [2 /*return*/, res.json({ data: stores })];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ msg: e_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=category.js.map