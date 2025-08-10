package com.buy.clear_cart.config;

import graphql.GraphQLError;
import graphql.ErrorType;
import graphql.language.SourceLocation;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class GraphQLExceptionHandler extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {

        return new GraphQLError() {
            @Override
            public String getMessage() {
                return ex.getMessage(); // ✅ send your exception's message
            }

            @Override
            public List<SourceLocation> getLocations() {
                return null; // you can return empty list if not needed
            }

            @Override
            public ErrorType getErrorType() {
                return ErrorType.DataFetchingException;
            }

            @Override
            public Map<String, Object> getExtensions() {
                return Map.of("classification", getErrorType().toString());
            }
        };
    }
}
