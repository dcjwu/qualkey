"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsHashableDataDto = void 0;
class CredentialsHashableDataDto {
    static fromCredentials(credentials) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const dto = new CredentialsHashableDataDto();
        dto.institutionUuid = (_a = credentials.institutionUuid) !== null && _a !== void 0 ? _a : undefined;
        dto.certificateId = (_b = credentials.certificateId) !== null && _b !== void 0 ? _b : undefined;
        dto.graduatedName = (_c = credentials.graduatedName) !== null && _c !== void 0 ? _c : undefined;
        dto.qualificationName = (_d = credentials.qualificationName) !== null && _d !== void 0 ? _d : undefined;
        dto.majors = (_e = credentials.majors) !== null && _e !== void 0 ? _e : undefined;
        dto.minors = (_f = credentials.minors) !== null && _f !== void 0 ? _f : undefined;
        dto.awardingInstitution = (_g = credentials.awardingInstitution) !== null && _g !== void 0 ? _g : undefined;
        dto.qualificationLevel = (_h = credentials.qualificationLevel) !== null && _h !== void 0 ? _h : undefined;
        dto.awardLevel = (_j = credentials.awardLevel) !== null && _j !== void 0 ? _j : undefined;
        dto.studyLanguage = (_k = credentials.studyLanguage) !== null && _k !== void 0 ? _k : undefined;
        dto.info = (_l = credentials.info) !== null && _l !== void 0 ? _l : undefined;
        dto.gpaFinalGrade = (_m = credentials.gpaFinalGrade) !== null && _m !== void 0 ? _m : undefined;
        dto.studyStartedAt = (_o = credentials.studyStartedAt) !== null && _o !== void 0 ? _o : undefined;
        dto.studyEndedAt = (_p = credentials.studyEndedAt) !== null && _p !== void 0 ? _p : undefined;
        dto.graduatedAt = (_q = credentials.graduatedAt) !== null && _q !== void 0 ? _q : undefined;
        dto.expiresAt = (_r = credentials.expiresAt) !== null && _r !== void 0 ? _r : undefined;
        return dto;
    }
    static fromCredentialsData(credentialsData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const dto = new CredentialsHashableDataDto();
        dto.institutionUuid = (_a = credentialsData.institutionUuid) !== null && _a !== void 0 ? _a : undefined;
        dto.certificateId = (_b = credentialsData.certificateId) !== null && _b !== void 0 ? _b : undefined;
        dto.graduatedName = (_c = credentialsData.graduatedName) !== null && _c !== void 0 ? _c : undefined;
        dto.qualificationName = (_d = credentialsData.qualificationName) !== null && _d !== void 0 ? _d : undefined;
        dto.majors = (_e = credentialsData.majors) !== null && _e !== void 0 ? _e : undefined;
        dto.minors = (_f = credentialsData.minors) !== null && _f !== void 0 ? _f : undefined;
        dto.awardingInstitution = (_g = credentialsData.awardingInstitution) !== null && _g !== void 0 ? _g : undefined;
        dto.qualificationLevel = (_h = credentialsData.qualificationLevel) !== null && _h !== void 0 ? _h : undefined;
        dto.awardLevel = (_j = credentialsData.awardLevel) !== null && _j !== void 0 ? _j : undefined;
        dto.studyLanguage = (_k = credentialsData.studyLanguage) !== null && _k !== void 0 ? _k : undefined;
        dto.info = (_l = credentialsData.info) !== null && _l !== void 0 ? _l : undefined;
        dto.gpaFinalGrade = (_m = credentialsData.gpaFinalGrade) !== null && _m !== void 0 ? _m : undefined;
        dto.studyStartedAt = (_o = credentialsData.studyStartedAt) !== null && _o !== void 0 ? _o : undefined;
        dto.studyEndedAt = (_p = credentialsData.studyEndedAt) !== null && _p !== void 0 ? _p : undefined;
        dto.graduatedAt = (_q = credentialsData.graduatedAt) !== null && _q !== void 0 ? _q : undefined;
        dto.expiresAt = (_r = credentialsData.expiresAt) !== null && _r !== void 0 ? _r : undefined;
        return dto;
    }
}
exports.CredentialsHashableDataDto = CredentialsHashableDataDto;
//# sourceMappingURL=credentials-hashable-data.dto.js.map