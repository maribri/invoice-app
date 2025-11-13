import { Invoice } from "../../../types";

export interface FormErrors {
    clientName?: string;
    clientEmail?: string;
    description?: string;
    items?: string;
    general?: string;
}
