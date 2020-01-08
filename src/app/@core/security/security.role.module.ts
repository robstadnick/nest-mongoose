import { NbSecurityModule } from "@nebular/security";
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    NbSecurityModule.forRoot({
        accessControl: {
          guest: {
            view: ['comments'],
          },
          customer_service: {
            //parent: 'guest',
            create: ['lossrun'],
            view: ['policies', 'noaccess'],
          },
          producer: {
            //parent: 'guest',
            create: ['lossrun'],
            view: ['policies', 'noaccess'],
          },
          agent_manager: {
            // parent: 'producer',
            create: ['producer'],
            remove: ['producer'],
            view: ['production', 'policies', 'allquotes'],
          },
          agent: {
            parent: 'agent_manager',
            create: ['producer'],
            remove: ['producer'],
            view: ['production', 'policies', 'allquotes'],
          },
          quote: {
            view: ['quote'],
            create: ['quote'],
          },
          employee: {
            parent: 'agent',
            view: ['brokers', 'lossrun', 'employee', 'admin', 'quote'],
            create: ['producer', 'production', 'policies', 'allquotes'],
            remove: '*',
          },
          underwriter: {
            parent: 'agent',
            approve: ['quotes'],
            create: ['producer', 'underwriter'],
            view: ['quotes_admin', 'quote', 'employee', 'production', 'policies', 'allquotes'],
          },
          product_manager: {
            parent: 'employee',
            view: ['brokers', 'lossrun', 'employee', 'admin', 'quote'],
            create: ['producer', 'underwriter'],
            remove: '*',
            apply: ['discount'],
          },
          admin: {
            parent: 'employee',
            view: ['quotes_admin', 'super_admin'],
            create: ['underwriter'],
            approve: '*',
            remove: '*',
            apply: ['discount'],
          },
        },
      })
  ],
  declarations: [
  ],
})
export class SecurityModule {
}