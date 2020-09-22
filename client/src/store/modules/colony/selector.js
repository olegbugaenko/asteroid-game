const getResource = (state, resourceCode) => ({
    amount: (state.colony.resources || []).find(resource => resource.resourceCode === resourceCode),
    capacity: (state.colony.capacity || []).find(resource => resource.resourceCode === resourceCode),
    reserved: (state.colony.reserved || []).find(resource => resource.resourceCode === resourceCode),
    production: (state.colony.production || []).find(resource => resource.resourceCode === resourceCode),
    name: (state.colony.resources || []).find(resource => resource.resourceCode === resourceCode).name,
});

const getResources = (state) => state.colony.resources.map(({resourceCode}) => ({
    amount: (state.colony.resources || []).find(resource => resource.resourceCode === resourceCode),
    capacity: (state.colony.capacity || []).find(resource => resource.resourceCode === resourceCode),
    reserved: (state.colony.reserved || []).find(resource => resource.resourceCode === resourceCode),
    production: (state.colony.production || []).find(resource => resource.resourceCode === resourceCode),
    name: (state.colony.resources || []).find(resource => resource.resourceCode === resourceCode).name,
}));

export {
    getResource,
    getResources
}
