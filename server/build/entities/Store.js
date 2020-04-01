"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Store = /** @class */ (function (_super) {
    tslib_1.__extends(Store, _super);
    function Store() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Store.prototype, "seq", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Store.prototype, "store_name", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Store.prototype, "store_location", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Store.prototype, "main_menu", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Store.prototype, "category", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Store.prototype, "logo_img", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Store.prototype, "order_count", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Store.prototype, "steam_count", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Store.prototype, "order_tip", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Store.prototype, "order_time", void 0);
    Store = tslib_1.__decorate([
        typeorm_1.Entity({ name: 'tb_store' })
    ], Store);
    return Store;
}(typeorm_1.BaseEntity));
exports.Store = Store;
//# sourceMappingURL=Store.js.map