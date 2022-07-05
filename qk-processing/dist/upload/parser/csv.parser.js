"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParser = void 0;
const common_1 = require("@nestjs/common");
const csv = require("csv-parser");
const dto_1 = require("../../credentials/dto");
let CsvParser = class CsvParser {
    async parseCsv(stream, authenticatedBy, mapping) {
        const credentialDtoArray = [];
        return new Promise((resolve, reject) => {
            stream.pipe(csv({
                headers: mapping,
                skipLines: 1,
            }))
                .on("data", function (data) {
                try {
                    const dto = new dto_1.CredentialsDataDto();
                    dto.institutionUuid = authenticatedBy.institutionUuid;
                    dto.email = data.email;
                    dto.certificateId = data.certificateId;
                    dto.graduatedName = data.graduatedName;
                    dto.qualificationName = data.qualificationName;
                    dto.majors = data.majors;
                    dto.minors = data.minors;
                    dto.awardingInstitution = data.awardingInstitution;
                    dto.qualificationLevel = data.qualificationLevel;
                    dto.awardLevel = data.awardLevel;
                    dto.studyLanguage = data.studyLanguage;
                    dto.info = data.info;
                    dto.gpaFinalGrade = data.gpaFinalGrade;
                    dto.authenticatedBy = (authenticatedBy.firstName + " " + authenticatedBy.lastName).trim();
                    dto.authenticatedTitle = authenticatedBy.title;
                    dto.authenticatedAt = new Date();
                    dto.studyStartedAt = (!data.studyStartedAt) ? undefined : new Date(data.studyStartedAt);
                    dto.studyEndedAt = (!data.studyEndedAt) ? undefined : new Date(data.studyEndedAt);
                    dto.graduatedAt = (!data.graduatedAt) ? undefined : new Date(data.graduatedAt);
                    dto.expiresAt = (!data.expiresAt) ? undefined : new Date(data.expiresAt);
                    credentialDtoArray.push(dto);
                }
                catch (err) {
                    common_1.Logger.error(err, err.stack);
                }
            })
                .on("error", (err) => reject(err))
                .on("end", function () {
                resolve(credentialDtoArray);
            });
        });
    }
};
CsvParser = __decorate([
    (0, common_1.Injectable)()
], CsvParser);
exports.CsvParser = CsvParser;
//# sourceMappingURL=csv.parser.js.map