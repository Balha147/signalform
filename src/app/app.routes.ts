import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./home/home').then(m => m.Home)
            },
            {
                path: 'quotes/create',
                loadComponent: () => import('./Invoice/invoice-form/invoice-form').then(m => m.InvoiceForm)
            },
            {
                path: 'clients',
                loadComponent: () => import('./clients/clients-page/clients-page').then(m => m.ClientsPage)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
