import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import React from 'react';
import SchooAdminApp from './admin_app';
import TeacherApp from './teacherapp';

// ----------------------------------------------------------------------

function TeacherMain() {
    return <HelmetProvider>
        <BrowserRouter basename='/teacher'>
            <Suspense>
                <TeacherApp />
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
}


export default TeacherMain;


