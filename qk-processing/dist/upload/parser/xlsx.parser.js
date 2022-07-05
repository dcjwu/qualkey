"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsxParser = void 0;
const common_1 = require("@nestjs/common");
const XLSX = require("xlsx");
const dto_1 = require("../../credentials/dto");
let XlsxParser = class XlsxParser {
    async parseXlsx(stream, authenticatedBy, mapping) {
        const buffers = [];
        const credentialDtoArray = [];
        return new Promise((resolve, reject) => {
            stream.on("data", (data) => buffers.push(data));
            stream.on("error", (err) => reject(err));
            stream.on("end", () => {
                try {
                    const buffer = Buffer.concat(buffers);
                    const workbook = XLSX.read(buffer);
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(sheet, { header: mapping });
                    json.forEach(data => {
                        const dto = new dto_1.CredentialsDataDto();
                        dto.institutionUuid = authenticatedBy.institutionUuid;
                        dto.email = data["email"];
                        dto.certificateId = data["certificateId"];
                        dto.graduatedName = data["graduatedName"];
                        dto.qualificationName = data["qualificationName"];
                        dto.majors = data["majors"];
                        dto.minors = data["minors"];
                        dto.awardingInstitution = data["awardingInstitution"];
                        dto.qualificationLevel = data["qualificationLevel"];
                        dto.awardLevel = data["awardLevel"];
                        dto.studyLanguage = data["studyLanguage"];
                        dto.info = data["info"];
                        dto.gpaFinalGrade = data["gpaFinalGrade"];
                        dto.authenticatedBy = (authenticatedBy.firstName + " " + authenticatedBy.lastName).trim();
                        dto.authenticatedTitle = authenticatedBy.title;
                        dto.authenticatedAt = new Date();
                        dto.studyStartedAt = (!data["studyStartedAt"]) ? undefined : new Date(data["studyStartedAt"]);
                        dto.studyEndedAt = (!data["studyEndedAt"]) ? undefined : new Date(data["studyEndedAt"]);
                        dto.graduatedAt = (!data["graduatedAt"]) ? undefined : new Date(data["graduatedAt"]);
                        dto.expiresAt = (!data["expiresAt"]) ? undefined : new Date(data["expiresAt"]);
                        credentialDtoArray.push(dto);
                    });
                }
                catch (err) {
                    common_1.Logger.error(err, err.stack);
                }
                resolve(credentialDtoArray);
            });
        });
    }
};
XlsxParser = __decorate([
    (0, common_1.Injectable)()
], XlsxParser);
exports.XlsxParser = XlsxParser;
//# sourceMappingURL=xlsx.parser.js.map