export const getPublicRoutes = (): string[] => {
    const routes = process.env.PUBLIC_ROUTES;
    return routes ? routes.split(',') : [];
};
