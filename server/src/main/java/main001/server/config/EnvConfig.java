package main001.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {
    private static String secretKey;

    public EnvConfig(@Value("${jwt.secret-key}") String secretKey) {
        EnvConfig.secretKey = secretKey;
    }

    public static String getSecretKey() {
        return secretKey;
    }
}
