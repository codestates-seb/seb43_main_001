package main001.server.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenizer {
    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration}")
    private int refreshTokenExpirationMinutes;

    private final Map<String, Long> tokenBlackList = new HashMap<>();


    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Access Token 생성 메서드
     */
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64SecretKey) {
        Key key = getKeyFromBase64SecretKey(base64SecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /**
     * Refresh Token 생성 메서드 : Access Token이 만료되었을 경우, Access Token을 새로 생성하는 토큰
     */
    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       String base64SecretKey) {

        Key key = getKeyFromBase64SecretKey(base64SecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64SecretKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    /**
     * JWT 검증기능 구현
     */
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64SecretKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64SecretKey(String base64SecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64SecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    /**
     * Token을 삭제하기 위한 TokenBlacklist 기능
     */
    public void addToTokenBlacklist(String jws) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        Long expirationTime = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jws)
                .getBody().get("refreshTokenExpirationMinutes", Long.class);

        tokenBlackList.put(jws, expirationTime);
    }

    /**
     * TokenBlacklist 여부 확인 기능
     */
    public boolean isTokenInBlackList(String jws) {
        if (!tokenBlackList.containsKey(jws)) {
            return false;
        }

        long expirationTime = tokenBlackList.get(jws);
        if (System.currentTimeMillis() > expirationTime) {
            tokenBlackList.remove(jws);
            return false;
        }

        return true;
    }
}
