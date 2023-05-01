import axiosInstance from 'src/api';
import { BaseResponse } from 'src/types';

export interface AccessTokenData {
  id: string;
  studentId: string;
  companyBranchId: string;
  CompanyBranch: {
  location: string;
  };
  Student: {
    name: string;
  };
}

export interface GetAcceptedTrainingsResponse extends BaseResponse {
  data: AccessTokenData[];
}

export const getAcceptedTrainings =
  async (): Promise<GetAcceptedTrainingsResponse> => {
    const url = '/training/acceptedTrainings';
    const response = await axiosInstance.get<GetAcceptedTrainingsResponse>(url);
    return response.data;
  };