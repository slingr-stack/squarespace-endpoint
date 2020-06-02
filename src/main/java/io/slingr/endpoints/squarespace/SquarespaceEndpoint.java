package io.slingr.endpoints.squarespace;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.framework.annotations.EndpointFunction;
import io.slingr.endpoints.framework.annotations.EndpointProperty;
import io.slingr.endpoints.framework.annotations.SlingrEndpoint;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import org.apache.log4j.Logger;

import java.util.UUID;

/**
 * <p>Squarespace endpoint
 * <p>
 * <p>Created by hpacini on 05/01/21.
 */
@SlingrEndpoint(name = "squarespace", functionPrefix = "_")
public class SquarespaceEndpoint extends HttpEndpoint {

    private static final Logger logger = Logger.getLogger(SquarespaceEndpoint.class);

    private static final String SQUARESPACE_API_URL = "https://api.squarespace.com/1.0";

    @EndpointProperty
    private String token;

    public SquarespaceEndpoint() {
    }

    @Override
    public String getApiUri() {
        return SQUARESPACE_API_URL;
    }

    @Override
    public void endpointStarted() {
        httpService().setupBearerAuthenticationHeader(token);
        httpService().setupDefaultHeader("Accept", "application/json");
        httpService().setupDefaultHeader("User-Agent", "curl/7.54.0");
    }

    @EndpointFunction(name = "_postWithHeader")
    public Json postWithHeaderRequest(FunctionRequest request) {

        Json req = request.getJsonParams();
        String path = req.string("path");
        logger.debug(String.format("[POST] request to %s", path));

        Json body = req.json("body");
        if (body != null && body.contains("idempotencyKey")) {
            String idempotencyKey = body.string("idempotencyKey");
            httpService().setupDefaultHeader("Idempotency-Key", idempotencyKey);
            body.remove("idempotencyKey");
        }

        req.set("body", body);
        return httpService().defaultPostRequest(req);

    }

    @EndpointFunction(name = "_idempotencyKey")
    public String idempotencyKey(FunctionRequest request) {

        return UUID.randomUUID().toString();

    }
}
