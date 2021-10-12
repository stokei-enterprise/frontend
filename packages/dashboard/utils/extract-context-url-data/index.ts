export const extractContextURLParam = (paramName: string, context: any) => {
    if(!context?.params){
        return undefined;
    }
    return context?.params[paramName] || undefined;
};

export const extractContextURLQueryParam = (queryParamName: string, context: any) => {
    if(!context?.query){
        return undefined;
    }
    return context?.query[queryParamName] || undefined;
};
