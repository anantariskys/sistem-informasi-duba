import {  EditAdminPayload } from '../schema/adminSchema';

export type DeleteAdminPayload = {
  id: string;
};
export interface EditAdminPayloadWithId extends EditAdminPayload {
  id: string;
}
