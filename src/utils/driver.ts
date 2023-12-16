import { driver } from 'driver.js'  
import "driver.js/dist/driver.css"

export const panelTour = driver({
    popoverClass: 'driverjs-theme',
    showProgress: true,
    steps: [
        { 
            element: '.button-add-section', 
            popover: { 
                title: 'Add New: article / section', 
                description: 'This button allows you to add a new ARTICLE on the "create article" page or to add a new SECTION on "an existing article" page' 
            } 
        },
        { 
            element: '.menu-radial', 
            popover: { 
                title: 'Article configuration', 
                description: 'This button allows you to access the post settings and control PUBLISH state, POST HEADER and DELETE "an existing article"' 
            } 
        },
        { 
            element: '.menu-table .navigation .toggle', 
            popover: { 
                title: 'Article menu', 
                description: 'This button allows you to access all of your "existing articles" as well as your user profile' 
            } 
        },
    ]
})  