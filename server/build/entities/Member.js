"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt-nodejs");
var Member = /** @class */ (function (_super) {
    tslib_1.__extends(Member, _super);
    function Member() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Member.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        tslib_1.__metadata("design:type", Number)
    ], Member.prototype, "seq", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Member.prototype, "email", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Member.prototype, "password", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Member.prototype, "phone_number", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Member.prototype, "nickname", void 0);
    Member = tslib_1.__decorate([
        typeorm_1.Entity({ name: 'tb_member' })
    ], Member);
    return Member;
}(typeorm_1.BaseEntity));
exports.Member = Member;
//# sourceMappingURL=Member.js.map