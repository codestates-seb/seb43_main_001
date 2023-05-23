package main001.server.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {
    private static String secretKey;

    private static String scheme;

    private static String baseUrl;

    private static String basePort;

    public EnvConfig(@Value("${jwt.secret-key}") String secretKey,
                     @Value("${uri.address.scheme}") String scheme,
                     @Value("${uri.address.url}") String  baseUrl,
                     @Value("${uri.address.port}") String basePort){
        EnvConfig.secretKey = secretKey;
        EnvConfig.scheme = scheme;
        EnvConfig.baseUrl = baseUrl;
        EnvConfig.basePort = basePort;
    }

    public static String getSecretKey() {
        return secretKey;
    }

    public static String getScheme() {
        return scheme;
    }

    public static String getBaseUrl() {
        return baseUrl;
    }

    public static String getBasePort() {
        return basePort;
    }
}
