export interface Permission {
  _id: string;
  title: string;
  subject: string;
  actions?: string[];
}
