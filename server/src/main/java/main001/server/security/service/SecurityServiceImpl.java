package main001.server.security.service;

import lombok.RequiredArgsConstructor;
import main001.server.domain.user.entity.User;
import main001.server.domain.user.repository.UserRepository;
import main001.server.exception.BusinessLogicException;
import main001.server.exception.ExceptionCode;
import main001.server.security.jwt.JwtTokenizer;
import main001.server.security.jwt.RefreshToken;
import main001.server.security.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@Service
@RequiredArgsConstructor
@Transactional
public class SecurityServiceImpl implements SecurityService{
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;

    public String delegateAccessToken(User user) {

        Map<String, Object> claims = new HashMap<>();

        claims.put("userId", user.getUserId());
        claims.put("username", user.getEmail());
        claims.put("roles",  user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String delegateRefreshToken(HttpServletRequest request, User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        RefreshToken token = new RefreshToken();
        token.setUserId(user.getUserId());
        token.setRefreshToken(refreshToken);
        token.setUserIp(getClientIp(request));
        refreshTokenRepository.save(token);

        return refreshToken;
    }

    public String reissueAccessToken(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        Map<String, Object> claims = new HashMap<>();

        claims.put("userId", findUser.getUserId());
        claims.put("username", findUser.getEmail());
        claims.put("roles",  findUser.getRoles());

        String subject = findUser.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String reissueRefreshToken(Long userId) {
        RefreshToken findRefreshToken = refreshTokenRepository.findByUserId(userId);

        Optional<User> optionalUser = userRepository.findById(userId);

        User findUser = optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        String subject = findUser.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        findRefreshToken.setRefreshToken(refreshToken);

        refreshTokenRepository.save(findRefreshToken);

        return refreshToken;
    }

    public String getClientIp(HttpServletRequest request) {
        String clientIp = null;
        boolean isIpInHeader = false;

        List<String> headerList = new ArrayList<>();
        headerList.add("X-Forwarded-For");
        headerList.add("HTTP_CLIENT_IP");
        headerList.add("HTTP_X_FORWARDED_FOR");
        headerList.add("HTTP_X_FORWARDED");
        headerList.add("HTTP_FORWARDED_FOR");
        headerList.add("HTTP_FORWARDED");
        headerList.add("Proxy-Client-IP");
        headerList.add("WL-Proxy-Client-IP");
        headerList.add("HTTP_VIA");
        headerList.add("IPV6_ADR");

        for (String header : headerList) {
            clientIp = request.getHeader(header);
            if (StringUtils.hasText(clientIp) && !clientIp.equals("unknown")) {
                isIpInHeader = true;
                break;
            }
        }

        if (!isIpInHeader) {
            clientIp = request.getRemoteAddr();
        }

        return clientIp;
    }

    public void deleteRefreshToken(Long userId) {
        refreshTokenRepository.deleteByUserId(userId);
    }

//    public void verifyToken(long userId) {
//        String clientIp = getClientIp(request);
//        String userIp = refreshTokenRepository.findById(userId).get().getUserIp();
//        String refreshToken = request.getHeader("refresh_token");
//        String userRefreshToken = refreshTokenRepository.findByUserId(userId).getRefreshToken();
//        Date tokenExpireDate = Jwts.claims().getExpiration();
//
//        if (!clientIp.equals(userIp)) {
//            throw new BusinessLogicException(ExceptionCode.USER_IP_NOT_MATCH);
//        }
//
//        if (!refreshToken.equals(userRefreshToken)) {
//            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_MATCH);
//        }
//
//        if(tokenExpireDate.after(new Date())) {
//            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_EXPIRED);
//        }
//    }
}
