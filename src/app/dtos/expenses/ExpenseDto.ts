import {ExpenseApprovalDto} from './ExpenseApproval.dto';
import {ExpenseCommentDto} from './ExpenseComment.dto';
import {ExpenseDisputeDto} from './ExpenseDispute.dto';
import {Currency} from '../../types';
import {Dto} from '../Dto';

export type CurrentExpenseState = 'APPROVED' | 'PENDING' | 'DISPUTED';

export interface ExpenseDto extends Dto {
  propertyId: string;
  name: string;
  description: string;
  amount: number;
  currencyCode: Currency;
  currentState: CurrentExpenseState;
  createdByEmail: string;
  createdByDisplayName: string;
  approvals: ExpenseApprovalDto[];
  disputes: ExpenseDisputeDto[];
  comments: ExpenseCommentDto[];
}

export const initialExpenseDto: ExpenseDto = {
  id: '',
  propertyId: '',
  name: '',
  description: '',
  amount: 0,
  currencyCode: 'EUR',
  currentState: 'PENDING',
  createdByEmail: '',
  createdByDisplayName: '',
  approvals: [],
  disputes: [],
  comments: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
