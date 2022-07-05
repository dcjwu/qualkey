"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileParser = void 0;
const common_1 = require("@nestjs/common");
const exception_1 = require("../../common/exception");
const csv_parser_1 = require("./csv.parser");
const xlsx_parser_1 = require("./xlsx.parser");
let FileParser = class FileParser {
    constructor(csvParser, xlsxParser) {
        this.csvParser = csvParser;
        this.xlsxParser = xlsxParser;
    }
    async parseUpload(stream, authenticatedBy, mapping, filename) {
        const extension = filename.split(".").pop();
        if ("csv" === extension) {
            return await this.csvParser.parseCsv(stream, authenticatedBy, mapping);
        }
        if ("xlsx" === extension) {
            return this.xlsxParser.parseXlsx(stream, authenticatedBy, mapping);
        }
        throw new exception_1.NotSupportedException(`Document extension is not supported ${extension}`);
    }
};
FileParser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [csv_parser_1.CsvParser,
        xlsx_parser_1.XlsxParser])
], FileParser);
exports.FileParser = FileParser;
//# sourceMappingURL=file-parser.js.map