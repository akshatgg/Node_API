"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accountscontroller = void 0;
var __1 = require("..");
var Accountscontroller = /** @class */ (function () {
    function Accountscontroller() {
    }
    Accountscontroller.Payablebill = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, supplierName, supplierAddress, contact, billDate, dueDate, billAmount, billNumber, billDiscription, paymentMethod, transactionId, paymentDate, paymentAmount, tax, comment, invoiceNumber, billpayable, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, supplierName = _a.supplierName, supplierAddress = _a.supplierAddress, contact = _a.contact, billDate = _a.billDate, dueDate = _a.dueDate, billAmount = _a.billAmount, billNumber = _a.billNumber, billDiscription = _a.billDiscription, paymentMethod = _a.paymentMethod, transactionId = _a.transactionId, paymentDate = _a.paymentDate, paymentAmount = _a.paymentAmount, tax = _a.tax, comment = _a.comment, invoiceNumber = _a.invoiceNumber;
                        if (!supplierName || !supplierAddress || !contact || !invoiceNumber || !billNumber || !paymentAmount) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Missing required fields.' })];
                        }
                        return [4 /*yield*/, __1.prisma.billpayable.create({
                                data: {
                                    supplierName: supplierName,
                                    supplierAddress: supplierAddress,
                                    contact: contact,
                                    billDate: billDate,
                                    dueDate: dueDate,
                                    billAmount: billAmount,
                                    billNumber: billNumber,
                                    billDiscription: billDiscription,
                                    paymentMethod: paymentMethod,
                                    transactionId: transactionId,
                                    paymentDate: paymentDate,
                                    paymentAmount: paymentAmount,
                                    tax: tax,
                                    comment: comment,
                                    invoiceNumber: invoiceNumber
                                },
                            })];
                    case 1:
                        billpayable = _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, data: billpayable })];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Error In creating BillPayable',
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Accountscontroller.getonepayablebill = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, onebill, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, __1.prisma.billpayable.findFirst({ where: { id: +id } })];
                    case 1:
                        onebill = _a.sent();
                        if (!onebill) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'Bill Post Not Found' })];
                        }
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: true, message: ' ID is required for this operation' })];
                        }
                        return [2 /*return*/, res.status(200).json({ success: true, data: onebill })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Error In creating BillPayable',
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Accountscontroller.getallpayablebill = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allbill, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, __1.prisma.billpayable.findMany({})];
                    case 1:
                        allbill = _a.sent();
                        if (!allbill) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'Bill Post Not Found' })];
                        }
                        return [2 /*return*/, res.status(200).json({ success: true, data: allbill })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Error In creating BillPayable',
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Accountscontroller.updatepayablebill = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, supplierName, supplierAddress, contact, billDate, dueDate, billAmount, billNumber, billDiscription, paymentMethod, transactionId, paymentDate, paymentAmount, tax, comment, invoiceNumber, updatebill, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, supplierName = _a.supplierName, supplierAddress = _a.supplierAddress, contact = _a.contact, billDate = _a.billDate, dueDate = _a.dueDate, billAmount = _a.billAmount, billNumber = _a.billNumber, billDiscription = _a.billDiscription, paymentMethod = _a.paymentMethod, transactionId = _a.transactionId, paymentDate = _a.paymentDate, paymentAmount = _a.paymentAmount, tax = _a.tax, comment = _a.comment, invoiceNumber = _a.invoiceNumber;
                        if (!supplierName || !supplierAddress || !contact || !invoiceNumber || !billNumber || !paymentAmount) {
                            return [2 /*return*/, res.status(400).json({ success: false, message: 'Missing required fields.' })];
                        }
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: true, message: ' ID is required for this operation' })];
                        }
                        return [4 /*yield*/, __1.prisma.billpayable.update({
                                where: { id: +id },
                                data: {
                                    supplierName: supplierName,
                                    supplierAddress: supplierAddress,
                                    contact: contact,
                                    billDate: billDate,
                                    dueDate: dueDate,
                                    billAmount: billAmount,
                                    billNumber: billNumber,
                                    billDiscription: billDiscription,
                                    paymentMethod: paymentMethod,
                                    transactionId: transactionId,
                                    paymentDate: paymentDate,
                                    paymentAmount: paymentAmount,
                                    tax: tax,
                                    comment: comment,
                                    invoiceNumber: invoiceNumber
                                },
                            })];
                    case 1:
                        updatebill = _b.sent();
                        if (!updatebill) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'Bill Post Not Found' })];
                        }
                        return [2 /*return*/, res.status(200).json({ success: true, data: updatebill })];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Error In creating BillPayable',
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Accountscontroller.deletepayablebill = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deletebill, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: true, message: ' ID is required for this operation' })];
                        }
                        return [4 /*yield*/, __1.prisma.billpayable.delete({
                                where: { id: +id },
                            })];
                    case 1:
                        deletebill = _a.sent();
                        if (!deletebill) {
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    message: 'Bill post Not Found ',
                                })];
                        }
                        return [2 /*return*/, res.status(200).json({ success: true, message: 'Post deleted' })];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Error In delating BillPayable',
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Accountscontroller;
}());
exports.Accountscontroller = Accountscontroller;
//# sourceMappingURL=accounts.controller.js.map