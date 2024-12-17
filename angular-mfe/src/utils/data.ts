export const exposableComponents = [
    {
        component : () => import("./../app/header/header.component").then(c => c.HeaderComponent),
        tag : 'angular-header',
        
    }
]