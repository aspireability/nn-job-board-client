import { string } from "prop-types"

export interface IJobFile {
  fileId: string;
  fileName: string;
}

export interface IJob {
    id: string,
    jobTitle?: string,
    jobDescription?: string,
    jobDescriptionUpload?: IJobFile[],
    employer?: string,
    sector?: string,
    workType?: string,
    locationType?: string,
    location?: string,
    payRange?: string,
    hourlyWages?: string,
    payCode?: string,
    benefits?: string,
    startingDate?: string,
    closingDate?: string,
    address?: string,
    navajoPreference?: string,
    veteranPreference?: string,
    requiredDocuments?: string,
    classification?: string,
    preferredEdExp?: string,
    additionalReq?: string,
    postingID?: string,
    applicationIn?: string,
    applicationLink?: string,
}