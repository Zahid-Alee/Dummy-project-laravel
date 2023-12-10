const { createInertiaApp } = require("@inertiajs/react");
const { resolvePageComponent } = require("laravel-vite-plugin/inertia-helpers");
const { createRoot } = require("react-dom/client");
// import './'

createInertiaApp({

    title: title => title - 'app',
    resolve: (comp) => resolvePageComponent(`./Test/${comp}.jsx`),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />)
    },
    progress: {
        color: 'orangered',
    }

})