import { applyWhen, email, minLength, pattern, required, schema } from "@angular/forms/signals";

export interface ClientProfile {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    siret: string;
    createdAt: Date;
    preferredContact: 'email' | 'phone' | 'both';
}

export type ClientCreate = Omit<ClientProfile, 'id' | 'createdAt'>;
export type ClientProfileSnapshot = Pick<ClientProfile, 'companyName' | 'contactName' | 'address' | 'siret'>;

export const initialClientProfile: ClientProfile = {
    id: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    siret: '',
    createdAt: new Date(),
    preferredContact: 'both',
};

export const clientSchema = schema<ClientProfile>(rootPath => {
    required(rootPath.companyName, { message: 'La raison sociale est requise' });
    required(rootPath.contactName, { message: 'Le nom du contact est requis' });

    applyWhen(
        rootPath,
        ({ value }) => value().preferredContact !== 'phone',
        (path) => {
            required(path.email, { message: 'Email requis pour ce mode de contact' });
            email(path.email, { message: 'Adresse email invalide' });
        }
    );

    applyWhen(
        rootPath,
        ({ value }) => value().preferredContact !== 'email',
        (path) => {
            required(path.phone, { message: 'Téléphone requis pour ce mode de contact' });
            minLength(path.phone, 10, { message: 'Minimum 10 chiffres requis' });
        }
    );

    required(rootPath.address, { message: "L'adresse est requise" });
    required(rootPath.siret, { message: 'Le SIRET est requis' });
    pattern(rootPath.siret, /^\d{14}$/, { message: 'Le SIRET doit contenir 14 chiffres' });
});
