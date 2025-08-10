package com.buy.clear_cart.config;

import graphql.GraphQLError;
import graphql.ErrorType;
import graphql.GraphqlErrorBuilder;
import graphql.language.SourceLocation;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.stereotype.Component;

@Component
public class GraphQLExceptionHandler extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
        return GraphqlErrorBuilder.newError(env)
                .message(ex.getMessage())
                .build();
    }
}
