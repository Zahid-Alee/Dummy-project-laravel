import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import React from 'react';
import SchooAdminApp from './admin_app';

// ----------------------------------------------------------------------

function SchoolAdminMain() {
    return <HelmetProvider>
        <BrowserRouter basename='/school-admin'>
            <Suspense>
                <SchooAdminApp />
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
}


export default SchoolAdminMain;


