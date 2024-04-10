"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.GET = void 0;
var postgres_1 = require("@vercel/postgres");
var server_1 = require("next/server");
var Pool = require('pg').Pool;
var pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});
function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var tablesResult, tables, columnsByTable, _i, tables_1, tableName, columnsResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      CREATE TABLE IF NOT EXISTS Customers (\n        CustomerID SERIAL PRIMARY KEY,\n        Name VARCHAR(255) NOT NULL,\n        YearDOB INT,\n        Email VARCHAR(255) NOT NULL UNIQUE\n      );\n    "], ["\n      CREATE TABLE IF NOT EXISTS Customers (\n        CustomerID SERIAL PRIMARY KEY,\n        Name VARCHAR(255) NOT NULL,\n        YearDOB INT,\n        Email VARCHAR(255) NOT NULL UNIQUE\n      );\n    "])))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject([" \n      CREATE TABLE IF NOT EXISTS Bookings (\n        BookingID SERIAL PRIMARY KEY,\n        CustomerID INT,\n        TrainID INT,\n        TicketID INT,\n        FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),\n        FOREIGN KEY (TrainID) REFERENCES Trains (TrainID),\n        FOREIGN KEY (TicketID) REFERENCES Tickets (TicketID)\n      );\n    "], [" \n      CREATE TABLE IF NOT EXISTS Bookings (\n        BookingID SERIAL PRIMARY KEY,\n        CustomerID INT,\n        TrainID INT,\n        TicketID INT,\n        FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),\n        FOREIGN KEY (TrainID) REFERENCES Trains (TrainID),\n        FOREIGN KEY (TicketID) REFERENCES Tickets (TicketID)\n      );\n    "])))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      CREATE TABLE IF NOT EXISTS Tickets (\n        TicketID SERIAL PRIMARY KEY,\n        TrainID INT,\n        Origin VARCHAR(255),\n        Destination VARCHAR(255),\n        Departure_Time TIMESTAMP,\n        Arrival_Time TIMESTAMP,\n        Available INT,\n        FOREIGN KEY (TrainID) REFERENCES Trains (TrainID)\n      );\n    "], ["\n      CREATE TABLE IF NOT EXISTS Tickets (\n        TicketID SERIAL PRIMARY KEY,\n        TrainID INT,\n        Origin VARCHAR(255),\n        Destination VARCHAR(255),\n        Departure_Time TIMESTAMP,\n        Arrival_Time TIMESTAMP,\n        Available INT,\n        FOREIGN KEY (TrainID) REFERENCES Trains (TrainID)\n      );\n    "])))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      CREATE TABLE IF NOT EXISTS Trains (\n        TrainID SERIAL PRIMARY KEY, \n        Type VARCHAR(255),\n        Seat_Quantity INT\n      );\n    "], ["\n      CREATE TABLE IF NOT EXISTS Trains (\n        TrainID SERIAL PRIMARY KEY, \n        Type VARCHAR(255),\n        Seat_Quantity INT\n      );\n    "])))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n            SELECT table_name\n            FROM information_schema.tables\n            WHERE table_schema = 'public'\n            AND table_type = 'BASE TABLE';\n        "], ["\n            SELECT table_name\n            FROM information_schema.tables\n            WHERE table_schema = 'public'\n            AND table_type = 'BASE TABLE';\n        "])))];
                case 5:
                    tablesResult = _a.sent();
                    tables = tablesResult.rows.map(function (row) { return row.table_name; });
                    columnsByTable = {};
                    _i = 0, tables_1 = tables;
                    _a.label = 6;
                case 6:
                    if (!(_i < tables_1.length)) return [3 /*break*/, 9];
                    tableName = tables_1[_i];
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n                SELECT column_name\n                FROM information_schema.columns\n                WHERE table_name = ", ";\n            "], ["\n                SELECT column_name\n                FROM information_schema.columns\n                WHERE table_name = ", ";\n            "])), tableName)];
                case 7:
                    columnsResult = _a.sent();
                    columnsByTable[tableName] = columnsResult.rows.map(function (row) { return row.column_name; });
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/, server_1.NextResponse.json({ columnsByTable: columnsByTable }, { status: 200 })];
                case 10:
                    error_1 = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: error_1.message }, { status: 500 })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
