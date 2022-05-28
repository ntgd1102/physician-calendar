export enum EventType {
    NewPatient= 'New Patient',
    FollowUp = 'Follow-Up',
}

export interface Physician {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Calendar {
    id: string;
    physicianId: string;
    time: Date;
    patientName: string;
    kind: EventType;
}