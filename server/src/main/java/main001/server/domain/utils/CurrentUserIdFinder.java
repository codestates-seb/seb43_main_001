package main001.server.domain.utils;

import io.jsonwebtoken.*;
import main001.server.config.EnvConfig;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class CurrentUserIdFinder {

    public static Long getCurrentUserId(HttpServletRequest request) {
        String secretKey = EnvConfig.getSecretKey();

        Integer userIdFromToken;

        String authorization = request.getHeader("Authorization");

        if (authorization == null) {
            return null;
        }

        String tokenValue = authorization.replace("Bearer ", ""); // 요청 시 전달한 JWT value

        // JWT에서 추출한 인증 정보를 불러오기 위한 JWT Parser
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build();

        try {
            Jws<Claims> parsedJwt = jwtParser.parseClaimsJws(tokenValue);
            Map<String, Object> jwtClaims = new HashMap<>(parsedJwt.getBody());
            userIdFromToken = (Integer) jwtClaims.get("userId");   // JWT에 담겨 있는 인증 서비스로부터 받은 유저 ID 정보
        } catch (JwtException ex) {
            // JWT 파싱 실패 시 예외처리
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_AVAILABLE);
        }
        return userIdFromToken.longValue();
    }
}
